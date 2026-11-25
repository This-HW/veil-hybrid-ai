/**
 * Firebase configuration for Veil.
 *
 * These values are public client identifiers (they are shipped inside every
 * Firebase web bundle). The real protection for the Gemini API is Firebase App
 * Check, which is enforced for AI Logic in the console. Never commit a debug
 * token, a service account or a Cloud secret — see README > Configuration.
 */
const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: env.VITE_FIREBASE_APP_ID ?? "",
};

export const recaptchaSiteKey = env.VITE_RECAPTCHA_SITE_KEY ?? "";

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

/** Cloud fallback model used by the hybrid SDK. */
export const CLOUD_MODEL = "gemini-3.5-flash-lite";

/** Where a local App Check debug token can be supplied (never committed). */
export const DEBUG_TOKEN_STORAGE_KEY = "veil.appcheck.debug-token";
