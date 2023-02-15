
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDEAneEdEV4XT9aZEkk8iENpA2ManGzpoE",
    authDomain: "quick-book-467eb.firebaseapp.com",
    projectId: "quick-book-467eb",
    storageBucket: "quick-book-467eb.appspot.com",
    messagingSenderId: "491160822828",
    appId: "1:491160822828:web:c7bd8ed3c1e17308639d89",
    measurementId: "G-H18T86GQYY"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db=getFirestore();
export const storage = getStorage();



export default app