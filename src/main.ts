import "./styles.css";
import { isFirebaseConfigured, CLOUD_MODEL, recaptchaSiteKey } from "./config";
import { getActiveDebugToken, getFirebaseApp } from "./firebase";
import { probeOnDevice } from "./aiLogic";
import {
  answer,
  prepare,
  type AnswerResult,
  type Prepared,
  type StageRecord,
} from "./pipeline";
import { sentCharacterCount, type Entity } from "./mask";
import { SAMPLES } from "./samples";

/* ------------------------------ elements ------------------------------ */

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el as T;
};

const noteInput = $<HTMLTextAreaElement>("note-input");
const taskInput = $<HTMLInputElement>("task-input");
const localOnlyToggle = $<HTMLInputElement>("local-only");
const runBtn = $<HTMLButtonElement>("run-btn");
const sendBtn = $<HTMLButtonElement>("send-btn");
const approveBox = $<HTMLInputElement>("approve");
const maskedText = $<HTMLPreElement>("masked-text");
const entitiesEl = $("entities");
const gateEl = $("gate");
const gateNote = $("gate-note");
const answerBody = $("answer-body");
const answerSource = $("answer-source");
const stageLog = $("stage-log");
const receipt = $("receipt");
const receiptList = $("receipt-list");
const statsEl = $("stats");
const receiptMini = $("receipt-mini");
const boundaryHint = $("boundary-hint");
const intakeError = $("intake-error");
const templatesEl = $("templates");
const deviceChip = $("device-chip");
const deviceLabel = $("device-label");
const footerMode = $("footer-mode");

/* ------------------------------ state ------------------------------ */

let prepared: Prepared | null = null;
let busy = false;

interface Usage {
  runs: number;
  deviceRuns: number;
  cloudRuns: number;
  masked: number;
}

const USAGE_KEY = "veil.usage";

function readUsage(): Usage {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (!raw) return { runs: 0, deviceRuns: 0, cloudRuns: 0, masked: 0 };
    const parsed = JSON.parse(raw) as Partial<Usage>;
    return {
      runs: Number(parsed.runs ?? 0),
      deviceRuns: Number(parsed.deviceRuns ?? 0),
      cloudRuns: Number(parsed.cloudRuns ?? 0),
      masked: Number(parsed.masked ?? 0),
    };
  } catch {
    return { runs: 0, deviceRuns: 0, cloudRuns: 0, masked: 0 };
  }
}

function writeUsage(usage: Usage): void {
  try {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  } catch {
    /* ignore */
  }
}

/* ------------------------------ helpers ------------------------------ */

function setBusy(button: HTMLButtonElement, value: boolean, label?: string): void {
  busy = value;
  const spinner = button.querySelector<HTMLElement>(".btn-spinner");
  const text = button.querySelector<HTMLElement>(".btn-label");
  if (spinner) spinner.hidden = !value;
  if (text && label) text.textContent = label;
  button.disabled = value;
  runBtn.disabled = value || !isFirebaseConfigured;
  sendBtn.disabled = value || !approveBox.checked || !prepared;
}

function showError(message: string | null): void {
  if (!message) {
    intakeError.hidden = true;
    intakeError.textContent = "";
    return;
  }
  intakeError.hidden = false;
  intakeError.textContent = message;
}

function renderStage(stage: StageRecord): void {
  const line = document.createElement("div");
  line.className = "stage-line";
  const src = document.createElement("span");
  src.className = `src ${stage.source}`;
  src.textContent = stage.source;
  const what = document.createElement("span");
  what.className = "what";
  what.textContent = stage.detail ? `${stage.label} — ${stage.detail}` : stage.label;
  const ms = document.createElement("span");
  ms.className = "ms";
  ms.textContent = `${Math.round(stage.ms)}ms`;
  line.append(src, what, ms);
  stageLog.append(line);
}

function clearStageLog(): void {
  stageLog.textContent = "";
}

/** Render masked text with highlighted placeholders. */
function renderMasked(masked: string, entities: Entity[]): void {
  const byPlaceholder = new Map(entities.map((e) => [e.placeholder, e]));
  maskedText.textContent = "";
  const parts = masked.split(/(\[[A-Z_]+_\d+\])/g);
  for (const part of parts) {
    const entity = byPlaceholder.get(part);
    if (entity) {
      const span = document.createElement("span");
      span.className = `tok ${entity.source}`;
      span.textContent = part;
      span.title = entity.type;
      maskedText.append(span);
    } else {
      maskedText.append(document.createTextNode(part));
    }
  }
}

function renderEntities(entities: Entity[]): void {
  entitiesEl.textContent = "";
  for (const entity of entities.slice(0, 24)) {
    const chip = document.createElement("span");
    chip.className = `entity-chip ${entity.source}`;
    const type = document.createElement("span");
    type.className = "type";
    type.textContent = entity.type;
    chip.append(type, document.createTextNode(entity.placeholder));
    entitiesEl.append(chip);
  }
}

function setSourcePill(text: string, className: string): void {
  answerSource.hidden = false;
  answerSource.className = `source-pill ${className}`;
  answerSource.textContent = text;
}

function renderStats(): void {
  const usage = readUsage();
  const share = usage.runs === 0 ? 0 : Math.round((usage.deviceRuns / usage.runs) * 100);
  statsEl.textContent = "";
  const items: [string, string][] = [
    ["runs", String(usage.runs)],
    ["kept on device", `${share}%`],
    ["entities hidden", String(usage.masked)],
  ];
  for (const [label, value] of items) {
    const span = document.createElement("span");
    const strong = document.createElement("strong");
    strong.textContent = value;
    span.append(strong, document.createTextNode(` ${label}`));
    statsEl.append(span);
  }
}

/* ------------------------------ templates ------------------------------ */

function renderTemplates(): void {
  templatesEl.textContent = "";
  for (const sample of SAMPLES) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "template-btn";
    btn.textContent = sample.label;
    btn.title = sample.blurb;
    btn.addEventListener("click", () => {
      noteInput.value = sample.note;
      taskInput.value = sample.task;
      resetPanels();
      deviceStatusHint();
    });
    templatesEl.append(btn);
  }
}

function resetPanels(): void {
  prepared = null;
  approveBox.checked = false;
  gateEl.hidden = true;
  receipt.hidden = true;
  receiptMini.hidden = true;
  answerSource.hidden = true;
  answerBody.textContent = "";
  const empty = document.createElement("p");
  empty.className = "empty";
  empty.textContent =
    "Veil answers here. Placeholders come back as the real names on your device — the model never sees them.";
  answerBody.append(empty);
  entitiesEl.textContent = "";
  clearStageLog();
  maskedText.textContent =
    "The redacted version of your note appears here — this is the exact text that would be sent.";
  boundaryHint.textContent = "Nothing yet.";
  sendBtn.disabled = true;
  showError(null);
}

function deviceStatusHint(): void {
  if (localOnlyToggle.checked) {
    boundaryHint.textContent = "Device-only mode.";
  }
}

/* ------------------------------ device probe ------------------------------ */

async function showDeviceStatus(): Promise<void> {
  const availability = await probeOnDevice();
  deviceChip.classList.remove("ready", "off");
  if (availability === "available") {
    deviceChip.classList.add("ready");
    deviceLabel.textContent = "Gemini Nano ready on this device";
  } else if (availability === "downloadable" || availability === "downloading") {
    deviceChip.classList.add("ready");
    deviceLabel.textContent = `Gemini Nano ${availability} — starts on first run`;
  } else if (availability === "unavailable") {
    deviceChip.classList.add("off");
    deviceLabel.textContent = "No on-device model in this browser";
  } else {
    deviceChip.classList.add("off");
    deviceLabel.textContent = "Chrome Prompt API not detected";
  }
}

/* ------------------------------ run ------------------------------ */

async function runPrivacyPass(): Promise<void> {
  const note = noteInput.value.trim();
  const task = taskInput.value.trim();
  if (note.length < 20) {
    showError("Add a note first — at least a couple of sentences, so there is something worth protecting.");
    return;
  }
  if (!task) {
    showError("Say what you need from the note (for example: draft a reply, list the risks).");
    return;
  }

  resetPanels();
  setBusy(runBtn, true, "Running…");
  approveBox.disabled = true;
  try {
    const result = await prepare(note, task, {
      localOnly: localOnlyToggle.checked,
      onStage: renderStage,
    });
    prepared = result;

    renderMasked(result.masked, result.entities);
    renderEntities(result.entities);
    receiptMini.hidden = false;
    $("raw-sent").textContent = String(sentCharacterCount(result.masked));
    $("entity-count").textContent = String(result.entities.length);
    $("scan-source").textContent =
      result.deviceScan === "ran" ? "Nano + rules (device)" : "rules only (device)";
    boundaryHint.textContent =
      result.lane === "cloud" ? "Waiting for your approval" : "Staying on this device";

    if (result.lane === "device") {
      await runAnswer();
    } else {
      gateEl.hidden = false;
      gateNote.className = "microcopy dim";
      gateNote.textContent = result.laneReason;
      if (result.deviceScan !== "ran") {
        gateNote.className = "microcopy";
        gateNote.textContent = `${result.laneReason} Semantic masking (names, free-text details) needs Chrome 139+ on desktop — read the redacted text below before you approve it.`;
      }
      if (result.residual.length > 0) {
        gateNote.className = "microcopy";
        gateNote.textContent = `Blocked: ${result.residual.length} unmasked value(s) survived the scan.`;
        approveBox.disabled = true;
      } else {
        approveBox.disabled = false;
      }
    }
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  } finally {
    setBusy(runBtn, false, "Run privacy pass");
    if (prepared) sendBtn.disabled = !approveBox.checked || prepared.residual.length > 0;
  }
}

async function runAnswer(): Promise<void> {
  if (!prepared) return;
  gateEl.hidden = true;
  setBusy(sendBtn, true, "Asking…");
  answerBody.textContent = "";
  const textNode = document.createElement("span");
  textNode.className = "streaming";
  answerBody.append(textNode);
  setSourcePill("thinking…", "");

  try {
    const result: AnswerResult = await answer(prepared, {
      onDelta: (delta) => {
        textNode.textContent += delta;
        answerBody.scrollTop = answerBody.scrollHeight;
      },
      onStage: renderStage,
    });

    textNode.classList.remove("streaming");
    textNode.textContent = result.text;
    setSourcePill(
      result.source === "on-device" ? "on-device · nothing sent" : "cloud · redacted only",
      result.source === "on-device" ? "on_device" : "in_cloud",
    );

    const usage = readUsage();
    usage.runs += 1;
    if (result.source === "on-device") usage.deviceRuns += 1;
    else usage.cloudRuns += 1;
    usage.masked += prepared.entities.length;
    writeUsage(usage);

    receipt.hidden = false;
    receiptList.textContent = "";
    const lines = [
      `${prepared.entities.length} entit${prepared.entities.length === 1 ? "y" : "ies"} replaced before any request left this device.`,
      `Sent to the cloud: ${prepared.lane === "cloud" ? `${sentCharacterCount(prepared.masked)} characters of masked text, 0 raw names` : "nothing"}.`,
      `Inference ran ${result.source === "on-device" ? "on your device" : `in Google's cloud (${CLOUD_MODEL})`}.`,
      `${result.restored} real value(s) restored locally after the answer.`,
    ];
    for (const line of lines) {
      const li = document.createElement("li");
      li.textContent = line;
      receiptList.append(li);
    }
    renderStats();
  } catch (error) {
    textNode.classList.remove("streaming");
    textNode.textContent = "";
    showError(
      `The answer failed: ${error instanceof Error ? error.message : String(error)}. The masked text is still here; nothing else was sent.`,
    );
    setSourcePill("failed", "offline-lock");
  } finally {
    setBusy(sendBtn, false, "Send masked request");
  }
}

/* ------------------------------ wiring ------------------------------ */

function boot(): void {
  renderTemplates();
  renderStats();
  void showDeviceStatus();

  footerMode.textContent = isFirebaseConfigured
    ? `cloud: ${CLOUD_MODEL} · App Check: ${recaptchaSiteKey ? "reCAPTCHA v3" : `debug ${getActiveDebugToken().slice(0, 8) || "—"}`}`
    : "Firebase not configured";

  approveBox.addEventListener("change", () => {
    sendBtn.disabled = busy || !approveBox.checked || !prepared;
  });
  runBtn.addEventListener("click", () => void runPrivacyPass());
  sendBtn.addEventListener("click", () => void runAnswer());
  localOnlyToggle.addEventListener("change", deviceStatusHint);

  if (!isFirebaseConfigured) {
    const notice = document.createElement("div");
    notice.className = "setup";
    notice.innerHTML =
      "<strong>Firebase is not configured.</strong><div>Copy <code>.env.example</code> to <code>.env.local</code>, paste your project's web config, then run <code>npm run dev</code> again.</div>";
    document.querySelector(".intake")?.append(notice);
    runBtn.disabled = true;
  }

  if (SAMPLES[0]) {
    noteInput.value = SAMPLES[0].note;
    taskInput.value = SAMPLES[0].task;
  }
  void (async () => {
    try {
      getFirebaseApp();
    } catch (error) {
      if (isFirebaseConfigured) showError(error instanceof Error ? error.message : String(error));
    }
  })();
}

boot();
