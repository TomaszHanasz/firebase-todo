// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiVQ6AuPBaMJ7eY3NewSjl1UwOeQLnlVE",
  authDomain: "todo-app-eeb17.firebaseapp.com",
  projectId: "todo-app-eeb17",
  storageBucket: "todo-app-eeb17.appspot.com",
  messagingSenderId: "226351522651",
  appId: "1:226351522651:web:0a18e179aaf2e35829707e",
  measurementId: "G-0HGXQVLXVF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// firebase authentication
export const auth = getAuth(app);

//sign up
export const createUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("create user", error);
  }
};

// Sign in with Email/password
export const signInWithEmail = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};
