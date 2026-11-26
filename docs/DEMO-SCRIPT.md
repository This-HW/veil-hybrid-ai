# Demo video — 3:00 storyboard (English, burned-in captions)

Recording target: the hosted build (GitHub Pages). Everything shown is the real app; there is no
simulated model. Each scene = one screen capture, annotated with a caption bar at the bottom.

| Time | Scene | On screen | Caption |
|---|---|---|---|
| 0:00–0:12 | Title card | Veil wordmark, tagline | **"Case notes contain other people's lives. Veil asks AI to help without handing those lives over."** |
| 0:12–0:35 | The problem | The intake panel with a housing case note pasted | "One paste into any chatbot and a client's name, address, diagnosis and rent arrears are on someone else's server. On-device models are private but small. Cloud models are strong but see everything." |
| 0:35–0:55 | Run | Click "Run privacy pass", stage log fills: Pattern mask → Nano privacy scan → Placeholder merge → Residual scan | "Veil runs two passes on the device first: deterministic masking, then Gemini Nano reviewing the note through Firebase AI Logic — mode `ONLY_ON_DEVICE`, structured output." |
| 0:55–1:20 | The boundary | Middle column: masked text with `[PERSON_1]`, `[EMAIL_1]`, `[MONEY_2]` chips, receipt (characters sent, entities replaced) | "This is the exact text that would leave the device. Names, addresses, dates, amounts, account numbers — replaced. The raw note has not been sent anywhere." |
| 1:20–1:40 | Review gate | Tick the approval box, "Send masked request" becomes active | "Nothing leaves until the person who owns the note has read this and approved it. That is the product, not a setting." |
| 1:40–2:10 | Cloud lane | Streaming answer appears; stage log shows `cloud · gemini-3.5-flash-lite`; source pill "cloud · redacted only" | "The cloud model reads placeholders only. It is told to reuse them, never to guess them. Mode `PREFER_IN_CLOUD` means an outage or an offline laptop still gets an answer, from the device." |
| 2:10–2:30 | Restore | Answer now shows the real names; receipt: "7 real values restored locally" | "Back on the device, real values are put back into the answer. The model never had them; the person still gets a readable summary." |
| 2:30–2:48 | Device lane | Switch "Device only", run a short note; badge `on-device · nothing sent`; device chip green (on a Chrome desktop with Nano) | "Small requests never need the cloud at all — answered on-device, offline, at zero cost. On a machine without Nano, Veil says so and keeps the cloud behind the review gate." |
| 2:48–3:00 | Close | Architecture strip + repo/URL | "Firebase AI Logic made one SDK enough for both lanes. Veil: private by default, powerful when you allow it. Repo and live demo in the description." |

Recording notes
- 1280×800 viewport, no browser chrome, dark UI.
- Keep the mouse movement minimal; one action per scene.
- The stage log and the receipt are the evidence — never crop them.
- If the on-device chip is not green in the recording browser, say it in the caption (scene 6)
  instead of implying Nano ran.
