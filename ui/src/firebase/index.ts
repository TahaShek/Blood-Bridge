// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhfx6-jBFh2ImOC2PM8hSdMFjv3zoU4BE",
  authDomain: "blood-bridge-17473.firebaseapp.com",
  projectId: "blood-bridge-17473",
  storageBucket: "blood-bridge-17473.firebasestorage.app",
  messagingSenderId: "741490935965",
  appId: "1:741490935965:web:5a74525ce68bfb6521ec74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };