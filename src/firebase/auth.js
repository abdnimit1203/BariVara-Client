import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onIdTokenChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Intentionally takes only email/password — no role parameter. Role is never
// client-chosen; the backend always defaults new accounts to `tenant` on
// first login (see verifyFirebaseToken.js).
export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

export const signOutUser = () => signOut(auth);

export const subscribeToAuthChanges = (callback) => onIdTokenChanged(auth, callback);
