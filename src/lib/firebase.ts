import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEqhAeXJZfaAUts-QKVjhULr-czTKPTjM",
  authDomain: "catolico-77369.firebaseapp.com",
  projectId: "catolico-77369",
  storageBucket: "catolico-77369.firebasestorage.app",
  messagingSenderId: "836974565993",
  appId: "1:836974565993:web:c1a97660ebe211444960f8",
  measurementId: "G-D8VVB8T9YB"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
