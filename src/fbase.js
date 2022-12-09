import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJID,
    storageBucket: process.env.REACT_APP_STORAGE,
    messagingSenderId: process.env.REACT_APP_MESSAGE,
    appId: process.env.REACT_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth();

export const dbService = getFirestore();

export const storageService = getStorage();