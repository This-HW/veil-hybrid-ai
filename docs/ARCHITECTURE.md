# Architecture notes

## Why the pipeline is shaped this way

The product promise is narrow and testable: **the raw note never reaches the network, and the
answer still reads naturally.** Everything below exists to keep that promise true even when the
model, the browser or the network misbehaves.

```
prepare()                                     answer()
─────────                                     ────────
1 rule mask            local, always
2 Nano privacy scan    ONLY_ON_DEVICE  ──┐
3 placeholder merge    local             │   6 lane answer
4 residual scan        local             │     device → ONLY_ON_DEVICE
5 lane decision        from #2 + length  │     cloud  → PREFER_IN_CLOUD
                                         │   7 local restore
```

### 1. Two maskers, one placeholder space

`src/mask.ts` keeps a single `Entity[]` for the whole run. The rule pass runs first and assigns
tokens; the device pass returns `{type, value}` pairs, which are merged with the next free token
of that type. `buildMaskedText` replaces the **longest value first** so a person's name inside a
street address is masked before the address is. Values the model hallucinated (absent from the
note) or repeated values are dropped, so the model cannot inflate the receipt.

### 2. Fail-closed behaviour

`residualHits()` re-runs every rule against the text that is about to leave. If anything matches
that is not already a placeholder, the UI disables the approval checkbox and says so. A masking
bug therefore produces a blocked send, not a leak.

When the on-device model is missing (no Chrome Prompt API, model not downloaded, unsupported
hardware), the scan step records `unavailable` and the UI states plainly that semantic masking
did not run. The cloud lane stays behind the human review gate — the app never quietly upgrades
itself to "cloud with regex".

### 3. Routing without a round trip

`localSufficient` and `reason` come back from the same on-device call as the entities, so asking
"can this stay local?" costs nothing and sends nothing. A length guard (`MAX_DEVICE_CHARS`)
overrides a positive answer when the note no longer fits an on-device context.

### 4. Both lanes, and the SDK's own fallback

* `device` lane: `ONLY_ON_DEVICE` — the request cannot leave even if the network is up.
* `cloud` lane: `PREFER_IN_CLOUD` — cloud first, on-device fallback when the cloud throws
  (offline, quota, outage). The pipeline retries on-device explicitly if the SDK raises.

`response.inferenceSource` is rendered next to every stage; the receipt repeats it. The UI never
infers which one ran.

### 5. Restoring

`restore()` swaps placeholders back for their real values after the answer arrives, on the
device, and counts how many it restored. The raw answer (with placeholders) is kept in memory
only for the receipt; nothing is written to storage.

## Firebase surface

| Concern | Used here |
|---|---|
| AI Logic hybrid inference | `getAI` + `GoogleAIBackend`, `getGenerativeModel` with `HybridParams`, `initializeDeviceModel`, `generateContentStream`, `inferenceSource` |
| Structured output | `Schema.object/array/enumString/boolean` → `onDeviceParams.promptOptions.responseConstraint` and `inCloudParams.generationConfig.responseSchema` |
| App Check | `initializeAppCheck` with `ReCaptchaEnterpriseProvider` (hosted) or the documented debug provider (localhost); App Check is enforced for AI Logic, so the hosted build must attest |

## Limits we know about

* Rule masking cannot see an unlabelled name; that gap is the reason for the on-device pass, and
  the reason the UI says so out loud.
* Nano's structured output is small; the schema is deliberately flat (a list plus two scalars).
* The recording environment for the demo video has no Prompt API, so the demo shows the honest
  degraded path (pattern mask → review → cloud). Judges on Chrome desktop 139+ see the full lane.
