// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKZWxpfGp45buylMx9uxcFQscSjJ0h0h4",
  authDomain: "netflix-ddbb1.firebaseapp.com",
  projectId: "netflix-ddbb1",
  storageBucket: "netflix-ddbb1.appspot.com",
  messagingSenderId: "753897799490",
  appId: "1:753897799490:web:c564380af6756d48c1d2db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
