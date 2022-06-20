import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4mt9QUlQhDoZ5wMRXmKr329RhVmpiRyU",
  authDomain: "aymakan-vue-calendar.firebaseapp.com",
  projectId: "aymakan-vue-calendar",
  storageBucket: "aymakan-vue-calendar.appspot.com",
  messagingSenderId: "133494948881",
  appId: "1:133494948881:web:6ea15b10c8077d8e769db0"
};


// init firebase
firebase.initializeApp(firebaseConfig);


// init firestore service
const appFirestore = firebase.firestore();

export { appFirestore }