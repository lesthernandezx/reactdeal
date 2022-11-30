// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-F8U-kTNrUiTXJOgpNP49LwH3rUk5oVY",
  authDomain: "reactdeal-4d0d8.firebaseapp.com",
  projectId: "reactdeal-4d0d8",
  storageBucket: "reactdeal-4d0d8.appspot.com",
  messagingSenderId: "839811339898",
  appId: "1:839811339898:web:cfbb7dff13c331ad5f4dc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);