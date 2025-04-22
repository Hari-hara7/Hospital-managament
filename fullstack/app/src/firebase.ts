import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyBSYfSpFnZ7PRzmhRjdzeKgmp2eHxwUNIE",
    authDomain: "hospital-6024d.firebaseapp.com",
    projectId: "hospital-6024d",
    storageBucket: "hospital-6024d.firebasestorage.app",
    messagingSenderId: "172530480897",
    appId: "1:172530480897:web:302ac7a3bfd37d4010cd00",
    measurementId: "G-H49L3Q3JYV"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
