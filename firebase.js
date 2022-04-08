import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  // add firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//features
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)