// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCszoI7h4o73KfV3mMmy7d1pk6yVr--rHg",
  authDomain: "eco-notes-25efe.firebaseapp.com",
  projectId: "eco-notes-25efe",
  storageBucket: "eco-notes-25efe.firebasestorage.app",
  messagingSenderId: "663564001814",
  appId: "1:663564001814:web:b7eec297856ebcc3304b37",
  measurementId: "G-T28QDW6MQJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
