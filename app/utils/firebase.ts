// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blogscribe-20781.firebaseapp.com",
  projectId: "blogscribe-20781",
  storageBucket: "blogscribe-20781.firebasestorage.app",
  messagingSenderId: "1085210542131",
  appId: "1:1085210542131:web:907a793062ac8177bee346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);