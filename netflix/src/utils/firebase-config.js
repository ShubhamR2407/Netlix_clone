// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAh4T2AggTq5D0i8xzklj62CcFp-dYxZLM",
  authDomain: "netflix-clone-d76d9.firebaseapp.com",
  projectId: "netflix-clone-d76d9",
  storageBucket: "netflix-clone-d76d9.appspot.com",
  messagingSenderId: "57458927660",
  appId: "1:57458927660:web:7a4eba6401b2d60fc4c989",
  measurementId: "G-LY6XYW2FMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)