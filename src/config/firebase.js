import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6QROJZ1Y3ZfiugqBxpPeeuQ7J3K22CbQ",
    authDomain: "first-project-418816.firebaseapp.com",
    projectId: "first-project-418816",
    storageBucket: "first-project-418816.firebasestorage.app",
    messagingSenderId: "750936274957",
    appId: "1:750936274957:web:7a96ae9d7819f555b3bd44",
    measurementId: "G-5WDTNYPPT7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { 
    auth,
    db,
    storage,
    googleProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
  };