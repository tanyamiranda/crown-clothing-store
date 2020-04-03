import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import FIREBASE_CONFIG from './firebase.config';

// Initialize Firebase with the config key
firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

// Setup Google Signing with popup
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

/*
    This method checks firebase for the user, and if it doesn't
    exists, it creates a record.

    This method uses a lot of asynchronous functions in firebase, 
    so those will have the await keyword in front to synchronize.
*/
export const createUserProfileDocument = async(userAuth, additionalData) => {

    if (!userAuth) return; // If user didn't sign in, do nothing.

    const userRef = await firestore.doc(`users/${userAuth.uid}`); 

    const snapshot = await userRef.get();

    console.log("snapshot=", snapshot);

    if (!snapshot.exists) {
        
        const {displayName,  email} = userAuth;
        const createdDate = new Date();

        try {

            //console.log("Creating new profile in firebase...");

            await userRef.set({
                displayName,
                email,
                createdDate,
                ...additionalData
            })    

        }
        catch (error) {
            console.log("Error creating user profile.", error);
        }
    }

    return userRef;

}


export const addCollectionAndDocuments = async (collectionKey, ObjectsToAdd) => {

    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();

    ObjectsToAdd.forEach( obj => {

        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    
    });

    return await batch.commit();

}

export default firebase;