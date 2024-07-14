// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "isucarpool-b5f20.firebaseapp.com",
  projectId: "isucarpool-b5f20",
  storageBucket: "isucarpool-b5f20.appspot.com",
  messagingSenderId: "393640386117",
  appId: "1:393640386117:web:29aabefde3b0c4a0a80d2c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);