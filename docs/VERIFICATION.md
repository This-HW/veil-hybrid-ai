# What was verified, and what was not

We would rather state this plainly than let a demo imply more than it shows.

## Verified in this build

| Check | How | Result |
|---|---|---|
| Cloud lane end to end | App Check debug token exchanged at `firebaseappcheck.googleapis.com`, then `generateContent` on `firebasevertexai.googleapis.com` with `X-Firebase-AppCheck` | `HTTP 200`, model replied `ready`; the app itself streamed a full summary of the sample note |
| App Check is enforced | Same call without the header | `HTTP 401 Firebase App Check token is invalid` |
| App Check provider | Console: App Check → Apps → Veil Web → Fraud Defense (reCAPTCHA Enterprise), site key for the hosted domain | registered, no billing account needed |
| Only masked text leaves | The outbound text is rendered in the middle column and sent verbatim; the browser console/network shows the same string | confirmed on the capture run (`video/console.log`, `video/shots/02-prepared.png`) |
| Local restore | Answer arrives with `[PERSON_1]`-style tokens; `restore()` swaps them on the device | `7 real value(s) put back on this device` in the receipt |
| Type safety and build | `npm run typecheck`, `npm run build` | clean |
| Echo guard | Headless Chromium's stub Prompt API echoes its input; `looksLikeEcho()` rejects it | device-only mode reports `FAILED` with an explanation instead of printing the raw note |

## Not verified here

* **Real Gemini Nano inference.** The build container has no Chrome desktop with the Nano model
  downloaded, so the `ONLY_ON_DEVICE` scan and the device-only answer were exercised only against
  the stub (i.e. the failure path). On a machine with Nano, the same code paths call the real model;
  the API usage follows the documented hybrid guide (`initializeDeviceModel`, `ONLY_ON_DEVICE`,
  `responseConstraint`).
* **Hosted build attestation.** The reCAPTCHA Enterprise site key is bound to the GitHub Pages
  domain; until the site is deployed the production App Check path cannot be exercised from
  another origin.

## Reproducing the on-device lane

1. Chrome desktop 139+ with `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` enabled.
2. `await LanguageModel.availability()` in the console; if `downloadable`, run
   `await LanguageModel.create()` once and wait for the model.
3. Load the app, click **Run privacy pass**: the header chip turns green and the *Nano privacy scan*
   stage reports `on_device` in the stage log.
