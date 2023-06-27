import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4PKIP7LXVv9oTe9y2zQKzFaUMVAneJ6Y",
    authDomain: "chat-app-639ce.firebaseapp.com",
    projectId: "chat-app-639ce",
    storageBucket: "chat-app-639ce.appspot.com",
    messagingSenderId: "702439026592",
    appId: "1:702439026592:web:f358bbeee1db54d5edfec5",
    measurementId: "G-53QZVF10PB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
