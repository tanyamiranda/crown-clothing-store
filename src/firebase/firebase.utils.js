import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import './firebase.config';
import FIREBASE_CONFIG from './firebase.config';

// the actual config key is obtained from the firebase app online
// Got to -> console.firebase.google.com
// -> Project Overview
// -> Select app and go to config
// -> Scroll down to Firebase SDK snippet
/*const firebaseConfig = {
    apiKey: "AIzaSyCl9uRsUm_rd-d6gX-RDUG46XZYQwFDcZo",
    authDomain: "urbandragonwear.firebaseapp.com",
    databaseURL: "https://urbandragonwear.firebaseio.com",
    projectId: "urbandragonwear",
    storageBucket: "urbandragonwear.appspot.com",
    messagingSenderId: "634585665282",
    appId: "1:634585665282:web:8859e84badc0796a3b7c1b"
};*/

const firebaseConfig = FIREBASE_CONFIG; // from firebase.config.js

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

// Setup Google Signing with popup
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;