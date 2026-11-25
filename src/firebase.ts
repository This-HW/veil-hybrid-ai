import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  CustomProvider,
  initializeAppCheck,
  ReCaptchaV3Provider,
  type AppCheck,
} from "firebase/app-check";
import { getAI, GoogleAIBackend, type AI } from "firebase/ai";
import {
  DEBUG_TOKEN_STORAGE_KEY,
  firebaseConfig,
  isFirebaseConfigured,
  recaptchaSiteKey,
} from "./config";

let app: FirebaseApp | undefined;
let ai: AI | undefined;
let appCheck: AppCheck | undefined;
let activeDebugToken = "";

/**
 * App Check debug tokens are secrets: they are read from local storage (or a
 * one-off `?appcheck_debug=` URL) and never committed to the repository.
 */
export function readDebugToken(): string {
  try {
    const fromUrl = new URLSearchParams(location.search).get("appcheck_debug");
    if (fromUrl) {
      localStorage.setItem(DEBUG_TOKEN_STORAGE_KEY, fromUrl);
      return fromUrl;
    }
    return localStorage.getItem(DEBUG_TOKEN_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveDebugToken(token: string): void {
  try {
    localStorage.setItem(DEBUG_TOKEN_STORAGE_KEY, token.trim());
  } catch {
    /* storage can be blocked; the token then only lasts for this page load */
  }
}

export function getActiveDebugToken(): string {
  return activeDebugToken;
}

function ensureDebugToken(): string {
  const existing = readDebugToken();
  if (existing) return existing;
  const generated =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `veil-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
  saveDebugToken(generated);
  return generated;
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase is not configured. Copy .env.example to .env.local and fill in the web config of your Firebase project.",
    );
  }
  if (app) return app;

  app = initializeApp(firebaseConfig);

  // AI Logic requires App Check. A hosted build attests with reCAPTCHA v3;
  // locally we use the documented App Check debug provider and show the token
  // so it can be allow-listed in the Firebase console.
  const globals = self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: string | boolean };
  let provider: ReCaptchaV3Provider | CustomProvider;

  if (recaptchaSiteKey) {
    provider = new ReCaptchaV3Provider(recaptchaSiteKey);
  } else {
    activeDebugToken = ensureDebugToken();
    globals.FIREBASE_APPCHECK_DEBUG_TOKEN = activeDebugToken;
    // In debug mode the SDK exchanges this token itself; the custom provider is
    // never called. It only satisfies the required option.
    provider = new CustomProvider({
      getToken: async () => ({ token: activeDebugToken, expireTimeMillis: Date.now() + 30 * 60_000 }),
    });
  }

  appCheck = initializeAppCheck(app, { provider, isTokenAutoRefreshEnabled: true });
  return app;
}

/** Gemini Developer API backend (free tier). */
export function getAIInstance(): AI {
  const firebaseApp = getFirebaseApp();
  if (!ai) {
    ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
  }
  return ai;
}

export function getAppCheck(): AppCheck | undefined {
  return appCheck;
}
