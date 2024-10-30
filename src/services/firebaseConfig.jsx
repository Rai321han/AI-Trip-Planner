// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb7PnDPV68FWQT9l1RhLQ_w0mK-XOePt4",
  authDomain: "ai-trip-planner-e9f5f.firebaseapp.com",
  projectId: "ai-trip-planner-e9f5f",
  storageBucket: "ai-trip-planner-e9f5f.appspot.com",
  messagingSenderId: "949646875887",
  appId: "1:949646875887:web:704964eca998f1e3000f1a",
  measurementId: "G-PDP2NN07ZJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
