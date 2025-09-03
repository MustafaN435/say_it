// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from 'firebase/auth';
import {
  getFirestore,
  serverTimestamp,
  collection,
  addDoc,
} from 'firebase/firestore';

// 🔁 REPLACE these with your Firebase console values
const firebaseConfig = {
  apiKey: "AIzaSyCMbSlwX2bVcdPjDo98Xt5ZpvRMZiB0oX4",
  authDomain: "say-it-364d4.firebaseapp.com",
  projectId: "say-it-364d4",
  storageBucket: "say-it-364d4.firebasestorage.app",
  messagingSenderId: "1086252901001",
  appId: "1:1086252901001:web:1e5b715c4bfc68eb8b9c58",
  measurementId: "G-PZNFVJF51E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const ts = serverTimestamp;

// Ensure we’re signed in (anonymous)
let _authReady = null;
export function ensureAuthReady() {
  if (_authReady) return _authReady;
  _authReady = new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsub();
        resolve(user);
      } else {
        signInAnonymously(auth).then(({ user }) => {
          resolve(user);
        }).catch(reject);
      }
    });
  });
  return _authReady;
}

// Helpers you’ll use in screens
export async function saveReportDoc(payload) {
  await ensureAuthReady();
  const ref = collection(db, 'reports');
  return addDoc(ref, { ...payload, createdAt: ts() });
}

export async function saveSosDoc(payload) {
  await ensureAuthReady();
  const ref = collection(db, 'sosSessions');
  return addDoc(ref, { ...payload, createdAt: ts() });
}
