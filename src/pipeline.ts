import { InferenceMode } from "firebase/ai";
import {
  answerPrompt,
  createAnswerModel,
  createScanModel,
  parseScan,
  probeOnDevice,
  scanPrompt,
  type DeviceAvailability,
  type Lane,
} from "./aiLogic";
import { buildMaskedText, residualHits, restore, ruleMask, type Entity } from "./mask";

export type StageSource = "local" | "on-device" | "cloud";

export interface StageRecord {
  label: string;
  source: StageSource;
  ms: number;
  detail?: string;
}

export interface Prepared {
  original: string;
  task: string;
  masked: string;
  entities: Entity[];
  stages: StageRecord[];
  device: DeviceAvailability;
  deviceScan: "ran" | "unavailable" | "failed";
  deviceNote: string;
  lane: Lane;
  laneReason: string;
  residual: string[];
  localSufficient: boolean;
}

const MAX_DEVICE_CHARS = 3500;

/**
 * Some Chromium builds ship a *stub* Prompt API that simply echoes the prompt
 * back ("On-device model is not available in Chromium, this API is just echoing
 * back the input"). Accepting that output would show the raw note in the answer
 * panel and would make the privacy claims false, so an echoing response counts
 * as "no usable on-device model".
 */
function looksLikeEcho(output: string, prompt: string): boolean {
  const norm = (value: string) => value.replace(/\s+/g, " ").trim().toLowerCase();
  const answer = norm(output);
  const source = norm(prompt);
  if (answer.length < 24) return false;
  if (source.includes(answer) && answer.length > 60) return true;
  const opening = answer.slice(0, 120);
  if (opening.length > 40 && source.includes(opening)) return true;
  // The stub prefixes its own notice, so also look for the prompt *inside* the
  // answer: a slice taken from the body of the note is distinctive enough.
  const from = Math.min(80, Math.max(0, source.length - 300));
  const probe = source.slice(from, from + 160);
  return probe.length > 60 && answer.includes(probe);
}

function withTimeout<T>(work: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    work,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} did not finish in ${Math.round(ms / 1000)}s — the on-device model may still be downloading`)),
        ms,
      ),
    ),
  ]);
}

function now(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export interface PrepareOptions {
  localOnly: boolean;
  onStage?: (stage: StageRecord) => void;
}

/**
 * Pass 1: everything that happens before any byte can leave the device.
 * Deterministic masking always runs; the on-device model adds semantic masking
 * and proposes a route (answer locally, or escalate to the cloud).
 */
export async function prepare(note: string, task: string, options: PrepareOptions): Promise<Prepared> {
  const stages: StageRecord[] = [];
  const track = (stage: StageRecord) => {
    stages.push(stage);
    options.onStage?.(stage);
  };

  const ruleStart = now();
  const ruleResult = ruleMask(note);
  track({
    label: "Pattern mask",
    source: "local",
    ms: now() - ruleStart,
    detail: `${ruleResult.entities.length} structured identifier(s) — device only`,
  });

  const device = await probeOnDevice();
  let deviceScan: Prepared["deviceScan"] = "unavailable";
  let deviceNote = "On-device model not available in this browser.";
  let localSufficient = false;
  let reason = "";
  const deviceValues: { type: string; value: string }[] = [];

  if (device === "available" || device === "downloadable" || device === "downloading") {
    const scanStart = now();
    try {
      const model = createScanModel();
      // Never let a first-run model download hold the UI: if Nano is not ready
      // within a few seconds we degrade honestly instead of hanging.
      const result = await withTimeout(
        (async () => {
          await model.initializeDeviceModel();
          return model.generateContent(scanPrompt(ruleResult.masked, task));
        })(),
        8000,
        "The on-device privacy scan",
      );
      const parsed = parseScan(result.response.text());
      if (looksLikeEcho(result.response.text(), scanPrompt(ruleResult.masked, task))) {
        throw new Error("the browser's Prompt API echoed the prompt — no real on-device model");
      }
      deviceValues.push(...parsed.entities);
      localSufficient = parsed.localSufficient;
      reason = parsed.reason;
      deviceScan = "ran";
      deviceNote = `Gemini Nano reviewed the note locally; ${parsed.entities.length} semantic entit${
        parsed.entities.length === 1 ? "y" : "ies"
      } flagged.`;
      track({
        label: "Nano privacy scan",
        source: "on-device",
        ms: now() - scanStart,
        detail: result.response.inferenceSource ?? "on_device",
      });
    } catch (error) {
      deviceScan = "failed";
      deviceNote = `On-device scan failed (${errorMessage(error)}). Nothing is sent without your approval.`;
      track({
        label: "Nano privacy scan",
        source: "on-device",
        ms: now() - scanStart,
        detail: "unavailable — fell back to pattern masking",
      });
    }
  } else {
    track({
      label: "Nano privacy scan",
      source: "on-device",
      ms: 0,
      detail:
        device === "unknown"
          ? "Chrome Prompt API not detected"
          : `on-device model ${device} in this browser`,
    });
  }

  const mergeStart = now();
  const { masked, entities } = buildMaskedText(note, ruleResult.entities, deviceValues);
  track({
    label: "Placeholder merge",
    source: "local",
    ms: now() - mergeStart,
    detail: `${entities.length} placeholder(s) applied`,
  });

  const residualStart = now();
  const residual = residualHits(masked);
  track({
    label: "Residual scan",
    source: "local",
    ms: now() - residualStart,
    detail: residual.length === 0 ? "clean — nothing raw left" : `${residual.length} leftover(s) blocked`,
  });

  let lane: Lane;
  let laneReason: string;
  const tooLongForDevice = masked.length > MAX_DEVICE_CHARS;
  if (options.localOnly) {
    lane = "device";
    laneReason = "Device-only mode is on — the cloud is never contacted.";
  } else if (deviceScan !== "ran") {
    lane = "cloud";
    laneReason = "No on-device model here, so a redacted escalation is the only way to answer in this browser.";
  } else if (localSufficient && !tooLongForDevice) {
    lane = "device";
    laneReason = reason || "The on-device model judged this answer small enough to keep local.";
  } else {
    lane = "cloud";
    laneReason =
      reason ||
      (tooLongForDevice
        ? "The note is longer than the on-device context, so the answer needs the cloud."
        : "The request needs more reasoning than the on-device model should carry.");
  }

  return {
    original: note,
    task,
    masked,
    entities,
    stages,
    device,
    deviceScan,
    deviceNote,
    lane,
    laneReason,
    residual,
    localSufficient,
  };
}

export interface AnswerResult {
  raw: string;
  text: string;
  restored: number;
  source: "on-device" | "cloud";
  stages: StageRecord[];
}

/**
 * Pass 2: the answer itself. The cloud lane prefers the cloud and may fall back
 * to the device (offline, quota, outage); the device lane never leaves the
 * machine. The SDK reports which one actually ran.
 */
export async function answer(
  prepared: Prepared,
  options: { onDelta?: (delta: string) => void; onStage?: (stage: StageRecord) => void },
): Promise<AnswerResult> {
  const stages: StageRecord[] = [];
  const track = (stage: StageRecord) => {
    stages.push(stage);
    options.onStage?.(stage);
  };

  const run = async (lane: Lane): Promise<{ text: string; source: "on-device" | "cloud" }> => {
    const start = now();
    const model = createAnswerModel(lane);
    const stream = await withTimeout(
      (async () => {
        if (lane === "device") await model.initializeDeviceModel();
        return model.generateContentStream(answerPrompt(prepared.masked, prepared.task));
      })(),
      lane === "device" ? 20000 : 60000,
      lane === "device" ? "The on-device answer" : "The cloud answer",
    );
    let text = "";
    for await (const chunk of stream.stream) {
      const delta = chunk.text();
      if (delta) {
        text += delta;
        options.onDelta?.(delta);
      }
    }
    const aggregated = await stream.response;
    const source: "on-device" | "cloud" =
      aggregated.inferenceSource === "on_device" || lane === "device" ? "on-device" : "cloud";
    track({
      label: lane === "cloud" ? "Cloud reasoning" : "On-device answer",
      source: source === "on-device" ? "on-device" : "cloud",
      ms: now() - start,
      detail: aggregated.inferenceSource ?? lane,
    });
    if (!text) text = aggregated.text();
    return { text, source };
  };

  let result: { text: string; source: "on-device" | "cloud" };
  try {
    result = await run(prepared.lane);
  } catch (error) {
    if (prepared.lane === "cloud") {
      track({
        label: "Cloud reasoning",
        source: "cloud",
        ms: 0,
        detail: `failed: ${errorMessage(error)} — retrying on device`,
      });
      result = await run("device");
    } else {
      throw error;
    }
  }

  // Never show an echoed prompt as an on-device answer.
  if (looksLikeEcho(result.text, answerPrompt(prepared.masked, prepared.task))) {
    track({
      label: "On-device answer",
      source: "on-device",
      ms: 0,
      detail: "rejected: the browser's Prompt API echoed the prompt",
    });
    throw new Error(
      "The on-device model in this browser is a stub that echoes its input, so Veil will not use its output. Use Chrome desktop 139+ with the Gemini Nano model downloaded, or leave device-only mode off.",
    );
  }

  const restoreStart = now();
  const { text, restored } = restore(prepared.entities, result.text);
  track({
    label: "Local restore",
    source: "local",
    ms: now() - restoreStart,
    detail: `${restored} real value(s) put back on this device`,
  });

  return { raw: result.text, text, restored, source: result.source, stages };
}

export { InferenceMode };
