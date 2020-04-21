import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCiCngry7bVIlbH29o3zfp6LWMfa3h7ecY",
    authDomain: "crwn-db-1817f.firebaseapp.com",
    databaseURL: "https://crwn-db-1817f.firebaseio.com",
    projectId: "crwn-db-1817f",
    storageBucket: "crwn-db-1817f.appspot.com",
    messagingSenderId: "816304759922",
    appId: "1:816304759922:web:6b975eb1d0d97e84df8eeb",
    measurementId: "G-P907HJR8SD"
  };

export const createUserProfileDocument = async( userAuth, additionalData ) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;