import { getGenerativeModel, InferenceMode, Schema, type GenerativeModel } from "firebase/ai";
import { getAIInstance } from "./firebase";
import { CLOUD_MODEL } from "./config";

/** Chrome Prompt API probe — a capability check, not an inference call. */
export type DeviceAvailability =
  | "available"
  | "downloadable"
  | "downloading"
  | "unavailable"
  | "unknown";

export async function probeOnDevice(): Promise<DeviceAvailability> {
  const lm = (globalThis as unknown as { LanguageModel?: { availability?: () => Promise<string> } })
    .LanguageModel;
  if (!lm?.availability) return "unknown";
  try {
    const value = await lm.availability();
    if (value === "available" || value === "downloadable" || value === "downloading" || value === "unavailable") {
      return value;
    }
    return "unknown";
  } catch {
    return "unknown";
  }
}

/* ------------------------------------------------------------------ */
/* Privacy scan (on-device only)                                      */
/* ------------------------------------------------------------------ */

export const SCAN_SCHEMA = Schema.object({
  properties: {
    entities: Schema.array({
      items: Schema.object({
        properties: {
          type: Schema.enumString({
            enum: ["PERSON", "ORG", "LOCATION", "HEALTH", "FINANCE", "LEGAL", "OTHER"],
          }),
          value: Schema.string(),
        },
      }),
    }),
    localSufficient: Schema.boolean(),
    reason: Schema.string(),
  },
});

const SCAN_SYSTEM_PROMPT = `You are the privacy scanner inside Veil, a note app for confidential case work.
The user pastes a note. Text that already looks like [EMAIL_1] or [PHONE_2] has been replaced and must be left alone.
List every remaining span that could identify a real person or expose private information: person names, organisations, exact locations, health conditions, money amounts tied to a person, legal matters, usernames, and any other free-text identifier.
Copy values exactly as written. Never invent text that is not in the note.
Also judge whether the user's request can be answered well by a small on-device model (localSufficient), and give a one-sentence reason.`;

export interface ScanResult {
  entities: { type: string; value: string }[];
  localSufficient: boolean;
  reason: string;
}

export function createScanModel(): GenerativeModel {
  return getGenerativeModel(getAIInstance(), {
    mode: InferenceMode.ONLY_ON_DEVICE,
    onDeviceParams: {
      createOptions: {
        expectedInputs: [{ type: "text", languages: ["en"] }],
        expectedOutputs: [{ type: "text", languages: ["en"] }],
        initialPrompts: [{ role: "system", content: [{ type: "text", value: SCAN_SYSTEM_PROMPT }] }],
      },
      promptOptions: { responseConstraint: SCAN_SCHEMA },
    },
  });
}

export function scanPrompt(note: string, task: string): string {
  return `NOTE\n"""\n${note}\n"""\n\nREQUEST\n${task}\n\nReturn the JSON object described by the schema.`;
}

/** Parse the on-device model's JSON defensively. */
export function parseScan(raw: string): ScanResult {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    return { entities: [], localSufficient: false, reason: "Unparsable scan output" };
  }
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1)) as Partial<ScanResult>;
    const entities = Array.isArray(parsed.entities)
      ? parsed.entities
          .filter((e): e is { type: string; value: string } => Boolean(e && typeof e.value === "string"))
          .map((e) => ({ type: String(e.type ?? "OTHER"), value: e.value }))
      : [];
    return {
      entities,
      localSufficient: Boolean(parsed.localSufficient),
      reason: typeof parsed.reason === "string" ? parsed.reason : "",
    };
  } catch {
    return { entities: [], localSufficient: false, reason: "Unparsable scan output" };
  }
}

/* ------------------------------------------------------------------ */
/* Answering                                                          */
/* ------------------------------------------------------------------ */

const CLOUD_SYSTEM_PROMPT = `You are Veil, a careful assistant for confidential case work.
The text you receive was redacted on the user's device: tokens such as [PERSON_1], [ORG_2] or [HEALTH_3] stand for private values that were removed before sending.
Never guess or invent their real values. Reuse the tokens exactly as written.
Answer the request concretely in English, under 220 words, in short paragraphs or a dash list. Write plain text only: no markdown bold, headings or tables. Do not mention the redaction process unless it changes the answer.`;

const DEVICE_SYSTEM_PROMPT = `You are Veil, running fully on this device.
Answer the request in plain English, at most 140 words, no markdown, no preamble.`;

export type Lane = "device" | "cloud";

export function createAnswerModel(lane: Lane): GenerativeModel {
  const ai = getAIInstance();
  if (lane === "device") {
    return getGenerativeModel(ai, {
      mode: InferenceMode.ONLY_ON_DEVICE,
      onDeviceParams: {
        createOptions: {
          expectedInputs: [{ type: "text", languages: ["en"] }],
          expectedOutputs: [{ type: "text", languages: ["en"] }],
          initialPrompts: [{ role: "system", content: [{ type: "text", value: DEVICE_SYSTEM_PROMPT }] }],
        },
      },
    });
  }
  return getGenerativeModel(ai, {
    mode: InferenceMode.PREFER_IN_CLOUD,
    inCloudParams: {
      model: CLOUD_MODEL,
      systemInstruction: CLOUD_SYSTEM_PROMPT,
      generationConfig: { temperature: 0.45, maxOutputTokens: 700 },
    },
    onDeviceParams: {
      createOptions: {
        expectedInputs: [{ type: "text", languages: ["en"] }],
        expectedOutputs: [{ type: "text", languages: ["en"] }],
        initialPrompts: [{ role: "system", content: [{ type: "text", value: DEVICE_SYSTEM_PROMPT }] }],
      },
    },
  });
}

export function answerPrompt(masked: string, task: string): string {
  return `REDACTED NOTE\n"""\n${masked}\n"""\n\nREQUEST\n${task}`;
}
