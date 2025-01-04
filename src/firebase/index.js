import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCP7ON8BKxW4V6HIrT4-d6cuLLHK6Stsw",
  authDomain: "chat-app-10d89.firebaseapp.com",
  projectId: "chat-app-10d89",
  storageBucket: "chat-app-10d89.firebasestorage.app",
  messagingSenderId: "979542274052",
  appId: "1:979542274052:web:235da36d97320258eb4551",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase auth hzimetlerine erişebilmek için kurulum
export const auth = getAuth(app);

// google auth hizmetini kullanbilmek için kurulu
export const provider = new GoogleAuthProvider();

// firestore veritbanının kurulumunu yap
export const db = getFirestore(app);
