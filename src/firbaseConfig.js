// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-j1bfwYauGKQDwgKSZStZTq3ljmLQHIk",
  authDomain: "blog1-5f4e3.firebaseapp.com",
  projectId: "blog1-5f4e3",
  storageBucket: "blog1-5f4e3.firebasestorage.app",
  messagingSenderId: "325776452962",
  appId: "1:325776452962:web:70f4771b3ca146cd49103b",
  measurementId: "G-5K2GS5JLBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


 export {db}