import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const AUTH_DOMAIN =process.env.REACT_APP_AUTH_DOMAIN
const PROJECT_ID =process.env.REACT_APP_PROJECT_ID
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID
const APP_ID = process.env.REACT_APP_APP_ID
const MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)