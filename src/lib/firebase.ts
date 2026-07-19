import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEqhAeXJZfaAUts-QKVjhULr-czTKPTjM",
  authDomain: "catolico-77369.firebaseapp.com",
  projectId: "catolico-77369",
  storageBucket: "catolico-77369.firebasestorage.app",
  messagingSenderId: "836974565993",
  appId: "1:836974565993:web:c1a97660ebe211444960f8",
  measurementId: "G-D8VVB8T9YB"
};

let app: FirebaseApp;
let db: Firestore;

function getClientApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) {
    db = getFirestore(getClientApp());
  }
  return db;
}

let analyticsInstance: ReturnType<typeof import("firebase/analytics")["getAnalytics"]> | null = null;

export async function getAnalyticsSafe() {
  if (typeof window === "undefined") return null;
  if (analyticsInstance) return analyticsInstance;
  const { getAnalytics } = await import("firebase/analytics");
  analyticsInstance = getAnalytics(getClientApp());
  return analyticsInstance;
}
