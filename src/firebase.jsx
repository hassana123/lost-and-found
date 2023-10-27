import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore if needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK90qRI1soQOCcYiThB2vA2g7TpiovmSQ",
  authDomain: "lostfound-4fdc8.firebaseapp.com",
  projectId: "lostfound-4fdc8",
  storageBucket: "lostfound-4fdc8.appspot.com",
  messagingSenderId: "136305206040",
  appId: "1:136305206040:web:3c8bb234e7192ff656746d",
  measurementId: "G-QV89FKLMXV",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore if needed

export { auth, firestore };
