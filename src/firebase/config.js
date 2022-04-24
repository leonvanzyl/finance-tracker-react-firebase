// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRZrpOCKpB9LCAjeofw_JVgpGfJyKb6lo",
  authDomain: "mymoney-f24ef.firebaseapp.com",
  projectId: "mymoney-f24ef",
  storageBucket: "mymoney-f24ef.appspot.com",
  messagingSenderId: "601760935459",
  appId: "1:601760935459:web:6463f7dc1045a5a4fa0b96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
