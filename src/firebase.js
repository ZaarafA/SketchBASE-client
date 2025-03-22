import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD1jNk4HgJsWF2zJRUA6M1IdYvMLLi1UYo",
    authDomain: "sketchbase-fae70.firebaseapp.com",
    projectId: "sketchbase-fae70",
    storageBucket: "sketchbase-fae70.firebasestorage.app",
    messagingSenderId: "6295064437",
    appId: "1:6295064437:web:dd0c1132c65aebfc934d3c",
    measurementId: "G-NEJQJHYDZX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
