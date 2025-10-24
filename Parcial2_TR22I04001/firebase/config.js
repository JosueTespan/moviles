// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChX1qtsc7-EsSFPkMdnk0pDf9K1xHd58E",
  authDomain: "parcial2-a19df.firebaseapp.com",
  projectId: "parcial2-a19df",
  storageBucket: "parcial2-a19df.firebasestorage.app",
  messagingSenderId: "940917293141",
  appId: "1:940917293141:web:86634ef15792efca0254dc",
  measurementId: "G-7EXXQ099HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);