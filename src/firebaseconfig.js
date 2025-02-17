// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEkbXv2HawcsGcbPF62go5cwd7Wn9dG0A",
  authDomain: "signin-adc0f.firebaseapp.com",
  projectId: "signin-adc0f",
  storageBucket: "signin-adc0f.firebasestorage.app",
  messagingSenderId: "1059379931789",
  appId: "1:1059379931789:web:6c71d90ca426b752dc10c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)