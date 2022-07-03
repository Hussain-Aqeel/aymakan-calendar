import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from 'firebase/functions'
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

//Firebase config
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
const analytics = getAnalytics(app);
// this function will be invoked to help us order the documents 
// based on created_at property
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


// init cloud functions
// const functions = firebase.functions();

export { appFirestore, functions, analytics, timestamp }