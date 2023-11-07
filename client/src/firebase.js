// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b2675.firebaseapp.com",
  projectId: "mern-estate-b2675",
  storageBucket: "mern-estate-b2675.appspot.com",
  messagingSenderId: "42947030497",
  appId: "1:42947030497:web:fb7c8177231336bf2c76a0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
