/**
 * Redaction engine.
 *
 * Two passes cooperate:
 *  1. deterministic rules (this file) — always run, never touch the network;
 *  2. the on-device model (see aiLogic.ts) — finds names, organisations and
 *     free-text identifiers that rules cannot catch.
 * Both produce `Entity` records and one placeholder each, so the same value is
 * always replaced by the same token.
 */

export type EntitySource = "rule" | "device";

export interface Entity {
  type: string;
  value: string;
  placeholder: string;
  source: EntitySource;
}

interface Rule {
  type: string;
  re: RegExp;
  /** When set, only this capture group is replaced (labels stay readable). */
  group?: number;
}

const RULES: Rule[] = [
  { type: "EMAIL", re: /\b[\w.+-]+@[\w-]+\.[\w.-]{2,}\b/g },
  { type: "URL", re: /\bhttps?:\/\/[^\s<>"')]+/g },
  { type: "IP", re: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g },
  // Korean resident registration number / foreigner registration number
  { type: "GOV_ID", re: /\b\d{6}[-\s]?[1-8]\d{6}\b/g },
  // Case / employee / account / ticket identifiers (before phone/card, which can swallow them)
  { type: "RECORD_ID", re: /\b(?:ACCT|CASE|EMP|SW|TCK|TICKET)[-\s#]*[A-Z0-9][A-Z0-9-]{3,}/g },
  { type: "RECORD_ID", re: /\b[A-Z]{2,5}-\d{4}-\d{3,5}\b/g },
  // Card numbers, with or without separators
  { type: "CARD", re: /\b(?:\d[ -]?){13,18}\d\b/g },
  // Korean / international phone numbers
  {
    type: "PHONE",
    re: /(?:\+?82[-\s.]?)?0(?:1[016789]|2|3[1-3]|4[1-4]|5[1-5]|6[1-5]|7[0-5])[-\s.]?\d{3,4}[-\s.]?\d{4}\b/g,
  },
  // Bank / account style numbers
  { type: "ACCOUNT", re: /\b\d{3,6}-\d{2,6}-\d{4,8}\b/g },
  // Birthday-like dates (identifying in case notes)
  { type: "DATE", re: /\b(?:19|20)\d{2}[-./년]\s?\d{1,2}[-./월]\s?\d{1,2}일?\b/g },
  // Money tied to a person (rent arrears, severance, plan price)
  { type: "MONEY", re: /\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\s?(?:KRW|USD|EUR|GBP|JPY|원)/g },
  { type: "MONEY", re: /\b\d+(?:\.\d+)?\s?(?:KRW|USD|EUR|GBP|JPY|원)\b/g },
  // Street addresses, romanised or Korean
  {
    type: "ADDRESS",
    re: /\b\d{1,5}\s+[A-Z][\w'-]*(?:\s[A-Z][\w'-]*)*\s(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Boulevard|Blvd|Drive|Dr)\b/g,
  },
  { type: "ADDRESS", re: /\b[A-Z][A-Za-z]+-(?:ro|gil|dong|gu)\b(?:\s\d+(?:-\d+)?(?:-gil)?)?/g },
  { type: "ADDRESS", re: /\b[A-Za-z가-힣0-9]+(?:로|길|동|읍|면|리)\s?\d+(?:-\d+)?(?:번지)?/g },
  // Labelled name fields ("Client: Mira Han") — the label stays, the value goes
  {
    type: "PERSON",
    re: /\b(?:Client|Employee|Patient|Applicant|Claimant|Contact|Name|Landlord|Manager|Tenant)\s*[:=]\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})/g,
    group: 1,
  },
  // Honorifics and role prefixes that carry a name in case notes
  { type: "PERSON", re: /\b(?:Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+([A-Z][a-z]+)/g, group: 1 },
  {
    type: "PERSON",
    re: /\b(?:worker|manager|landlord|agent|nurse|doctor|officer|HRBP|counsellor|therapist|supervisor|teacher)\s+([A-Z][a-z]+\s[A-Z][a-z]+)/g,
    group: 1,
  },
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Replace every literal occurrence of `needle`, case-sensitively. */
function replaceAllLiteral(haystack: string, needle: string, replacement: string): string {
  if (!needle) return haystack;
  return haystack.replace(new RegExp(escapeRegExp(needle), "g"), replacement);
}

/**
 * Deterministic pass over the raw note. Produces entities *and* the partially
 * masked text (labels are assigned in order of appearance).
 */
export function ruleMask(text: string): { masked: string; entities: Entity[] } {
  let masked = text;
  const entities: Entity[] = [];
  const counters = new Map<string, number>();

  for (const rule of RULES) {
    masked = masked.replace(rule.re, (...args: unknown[]) => {
      const match = String(args[0]);
      const captured = String(args[rule.group ?? 0] ?? match);
      const value = captured.trim();
      if (value.length < 2) return match;
      const existing = entities.find((e) => e.value === value);
      if (existing) return match.replace(captured, existing.placeholder);
      const next = (counters.get(rule.type) ?? 0) + 1;
      counters.set(rule.type, next);
      const placeholder = `[${rule.type}_${next}]`;
      entities.push({ type: rule.type, value, placeholder, source: "rule" });
      return match.replace(captured, placeholder);
    });
  }

  return { masked, entities };
}

/**
 * Merge model-found entities into the set of rule entities and rebuild the
 * masked text from the original. Values the model hallucinated (not present in
 * the text) and values already covered by a rule are dropped.
 */
export function buildMaskedText(
  original: string,
  ruleEntities: Entity[],
  deviceValues: { type?: string; value: string }[],
): { masked: string; entities: Entity[] } {
  const entities: Entity[] = [...ruleEntities];
  const counters = new Map<string, number>();
  for (const e of ruleEntities) {
    const n = Number(e.placeholder.replace(/\D+(\d+)\]$/, "$1")) || 0;
    counters.set(e.type, Math.max(counters.get(e.type) ?? 0, n));
  }

  for (const item of deviceValues) {
    const value = (item.value ?? "").trim();
    if (value.length < 2) continue;
    if (!original.includes(value)) continue;
    if (entities.some((e) => e.value === value)) continue;
    // A device value that only appears inside an already-masked value is noise.
    const type = (item.type ?? "OTHER").toUpperCase().replace(/[^A-Z_]/g, "") || "OTHER";
    const next = (counters.get(type) ?? 0) + 1;
    counters.set(type, next);
    entities.push({ type, value, placeholder: `[${type}_${next}]`, source: "device" });
  }

  // Longest first so a name inside an address is replaced before the address.
  const ordered = [...entities].sort((a, b) => b.value.length - a.value.length);
  let masked = original;
  for (const entity of ordered) {
    masked = replaceAllLiteral(masked, entity.value, entity.placeholder);
  }

  return { masked, entities };
}

/**
 * Second safety net: run the rules again over the text that is about to leave
 * the device. Anything still matched would be raw personal data, so the caller
 * blocks the send instead of transmitting it.
 */
export function residualHits(masked: string): string[] {
  const hits = new Set<string>();
  for (const rule of RULES) {
    for (const match of masked.match(rule.re) ?? []) {
      // Placeholders themselves never match; anything else is a leftover.
      if (!match.startsWith("[")) hits.add(match);
    }
  }
  return [...hits];
}

/** Put the real values back into a model answer, on this device only. */
export function restore(entities: Entity[], answer: string): { text: string; restored: number } {
  let text = answer;
  let restored = 0;
  for (const entity of [...entities].sort((a, b) => b.placeholder.length - a.placeholder.length)) {
    const before = text;
    text = replaceAllLiteral(text, entity.placeholder, entity.value);
    if (text !== before) restored += 1;
  }
  return { text, restored };
}

/** Characters the model would actually read (the masked text). */
export function sentCharacterCount(masked: string): number {
  return masked.length;
}
