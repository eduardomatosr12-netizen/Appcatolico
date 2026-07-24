import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = ["apiKey", "authDomain", "projectId", "appId"] as const;

for (const key of requiredKeys) {
  if (!firebaseConfig[key]) {
    console.warn(
      `[Lumen] Variável de ambiente NEXT_PUBLIC_FIREBASE_${key.toUpperCase()} não definida. ` +
      `Verifique seu arquivo .env.local.`
    );
  }
}

let app: FirebaseApp;
let db: Firestore;
let authInstance: Auth;

function getClientApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) {
    db = initializeFirestore(getClientApp(), {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
  }
  return db;
}

export function getAuthInstance(): Auth {
  if (!authInstance) {
    authInstance = getAuth(getClientApp());
  }
  return authInstance;
}

let analyticsInstance: ReturnType<typeof import("firebase/analytics")["getAnalytics"]> | null = null;

export async function getAnalyticsSafe() {
  if (typeof window === "undefined") return null;
  if (analyticsInstance) return analyticsInstance;
  const { getAnalytics } = await import("firebase/analytics");
  analyticsInstance = getAnalytics(getClientApp());
  return analyticsInstance;
}
