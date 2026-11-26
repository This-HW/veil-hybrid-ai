# Veil — a private desk for confidential notes

**Veil is a web app for people whose work notes are about other people**: social workers,
HR partners, case managers, clinic admin, support agents. It uses the Firebase AI Logic
**hybrid inference** SDK so that Gemini Nano on the device does the privacy work, the device
answers alone when the task is small, and the cloud only ever sees redacted text — after the
person has reviewed exactly what will be sent.

> Ask an AI to summarise a case note and you have just pasted a client's name, phone number
> and diagnosis into a server. Veil inverts that: **the device reads the raw note, the cloud
> reads a masked one, and the real names are put back on the device afterwards.**

Built for [Google #BuildHybridAI 2026](https://firebasehybridaihackathon.devpost.com/)
(Devpost, submissions close 2026-11-30 2:00 PM PT).

---

## The three AI calls (and the mode each one uses)

| # | Step | Model + mode | Why this mode |
|---|------|--------------|---------------|
| 1 | **Privacy scan** — find names, organisations, locations, health and legal details | `ONLY_ON_DEVICE` (Gemini Nano 4, structured JSON via `responseConstraint`) | The raw text must never leave the machine, so this call is *hard-locked* to the device. If Nano is unavailable the app does not silently escalate — it says so, and the cloud stays behind the review gate. |
| 2 | **Route** — can this be answered locally? | decided by call 1 (`localSufficient` + reason) | A local judgement avoids sending a request to the cloud just to ask *whether* the cloud is needed. |
| 3 | **Answer** | local lane: `ONLY_ON_DEVICE` · cloud lane: `PREFER_IN_CLOUD` | Small requests are answered offline, at zero cost, with nothing sent. Hard requests go cloud-first and fall back to the device if the network or quota fails. |

`response.inferenceSource` (`on_device` / `in_cloud`) is shown on every step, so the UI never
claims more privacy than actually happened.

### What makes it hybrid rather than "cloud with a local cache"

* **The boundary is a product surface.** The middle column of the UI *is* the exact text that
  would be sent. You approve it with a checkbox before any cloud call.
* **Fail-closed masking.** A second, deterministic rule pass re-scans the text that is about to
  leave and blocks the send if anything still looks like an identifier.
* **Both lanes are real.** The local lane runs with the network irrelevant; the cloud lane sends
  only placeholders, then a local pass restores real values in the answer.
* **Précis receipts.** Each run produces a receipt: characters sent, entities replaced, which
  steps ran on-device, and how many values were restored locally.

---

## Architecture

```
                    ┌──────────────────────── browser (device) ────────────────────────┐
 note (raw) ───────▶│ pass 1  rule mask ──▶ Nano privacy scan (ONLY_ON_DEVICE, JSON)   │
                    │         └──────────▶ placeholder merge ──▶ residual scan          │
                    │                                  │                                │
                    │                      lane = device │ lane = cloud                  │
                    │                                  ▼            ▼ (after approval)   │
                    │      answer ONLY_ON_DEVICE ◀───────┴──── Firebase AI Logic ────────┼──▶ Gemini (cloud)
                    │              │                                   │                  │    sees masked text
                    │              └──────────▶ local restore ◀────────┘                  │    only
                    └──────────────────────────────────────────────────────────────────┘
```

* `src/pipeline.ts` — the two passes, stage timings, lane decision, fallback on failure.
* `src/aiLogic.ts` — the models: scan model (`ONLY_ON_DEVICE` + `Schema`), answer models
  (`ONLY_ON_DEVICE` / `PREFER_IN_CLOUD`), device probe.
* `src/mask.ts` — deterministic rules, placeholder merge, residual scan, restore.
* `src/firebase.ts` — Firebase app + App Check (reCAPTCHA Enterprise / Fraud Defense in hosted builds, debug provider
  on localhost; the token is never committed).

---

## Run it

```bash
npm install
cp .env.example .env.local     # paste your Firebase web config
npm run dev                    # http://localhost:5173
```

Firebase setup (free Spark plan, no billing):

1. Create a Firebase project → add a **Web app** → copy the config into `.env.local`.
2. **AI Services → AI Logic → Get started → Gemini Developer API** (free tier). This enables the
   required APIs and enforces App Check for AI Logic.
3. **App Check**: on localhost the app prints a debug token in the browser console (and in the
   footer). Add it under *App Check → Apps → Manage debug tokens*. For a hosted build, register a
   **reCAPTCHA Enterprise (Fraud Defense)** site key for your domain, register it under
   *App Check → Apps → your web app → Fraud Defense*, and set `VITE_RECAPTCHA_SITE_KEY`.

For the **on-device lane** (Chrome desktop 139+):

1. `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` → Enabled → restart Chrome.
2. Open DevTools console and run `await LanguageModel.availability()`; if it returns
   `downloadable`, run `await LanguageModel.create()` once and wait for the model download.
3. Reload Veil — the chip in the header turns green and the scan step runs locally.

Everything still works without Nano, in the honest degraded shape: pattern masking only, a
warning that semantic masking is unavailable, and a mandatory human review before the cloud.

## Deploy

The live demo at **https://this-hw.github.io/veil-hybrid-ai/** is published from the `gh-pages`
branch: `VITE_BASE=/veil-hybrid-ai/` plus the Firebase web config (and `VITE_RECAPTCHA_SITE_KEY`)
are inlined at build time by `vite build`, and the contents of `dist/` (with an empty `.nojekyll`)
are committed to `gh-pages`. GitHub Pages serves that branch as-is — no build runs on GitHub's
side, so the repository needs no secrets.

The same build is also expressible as a workflow: [`docs/ci/deploy-actions.yml`](docs/ci/deploy-actions.yml)
is a ready GitHub Actions version (typecheck + `vite build` + `upload-pages-artifact`/`deploy-pages`).
Copy it to `.github/workflows/deploy.yml`, add the `VITE_*` values as repository **secrets**, and
switch Settings → Pages → Source to **GitHub Actions** if you would rather build on every push.
Nothing secret lives in the repo either way; the site's only secret is the App Check debug token
on localhost, which is never committed.

## Privacy notes (and honest limits)

* Raw notes never leave the browser: the scan step is `ONLY_ON_DEVICE`, and the send button only
  becomes active after the residual scan and the approval checkbox.
* The Firebase web config is public by design. **App Check is enforced for AI Logic** (Firebase
  enforced it project-wide on 2 Nov 2026), and the hosted build attests with **reCAPTCHA Enterprise
  (Fraud Defense)** registered for its domain; localhost uses the debug provider.
* Notes and answers are **not persisted** — the app stores only aggregate counters in
  `localStorage` (runs, device share, entities hidden).
* Limits: the rule pass cannot recognise unlabelled human names, which is exactly why the
  semantic pass exists; the on-device JSON schema keeps Nano's output predictable but small;
  on-device context is bounded (the app routes long notes to the cloud lane).
* This project was built during the #BuildHybridAI submission window (Nov 11–30, 2026). It uses
  the public Firebase JS SDK and no pre-existing code; all sample notes and people in them are
  fictional.


## Verification

[`docs/VERIFICATION.md`](docs/VERIFICATION.md) lists exactly what was exercised (the real cloud lane,
App Check enforcement, the local restore) and what was not (Gemini Nano itself, because the build
machine has no Nano model) — worth reading before judging the on-device claims.

## License

Apache-2.0 — see [LICENSE](LICENSE).
