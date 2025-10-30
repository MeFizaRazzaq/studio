// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD90wJD8MXj46ONSCBGjuYsKPJZLZL99rY",
  authDomain: "haus-of-meem.firebaseapp.com",
  projectId: "haus-of-meem",
  storageBucket: "haus-of-meem.firebasestorage.app",
  messagingSenderId: "561935136358",
  appId: "1:561935136358:web:a9dda29f41b20451461fa7",
  measurementId: "G-167CQF669F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);