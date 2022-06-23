import firebase from 'firebase/compat/app';
import { getFunctions } from 'firebase/functions'
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "calendar-eb32c.firebaseapp.com",
  projectId: "calendar-eb32c",
  storageBucket: "calendar-eb32c.appspot.com",
  messagingSenderId: "1014156027268",
  appId: "1:1014156027268:web:65a3448365d5829edca9d1",
  measurementId: "G-EBVV89RSN0"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const app = firebase.app();
const appFirestore = firebase.firestore();
const functions = getFunctions(app);

// init cloud functions
// const functions = firebase.functions();

export { appFirestore, functions }