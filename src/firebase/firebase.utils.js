import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDenge5o74MZQjWq6WZg4iCMIDHYvGQz34",
  authDomain: "loja-db-99c0f.firebaseapp.com",
  databaseURL: "https://loja-db-99c0f.firebaseio.com",
  projectId: "loja-db-99c0f",
  storageBucket: "loja-db-99c0f.appspot.com",
  messagingSenderId: "276973792433",
  appId: "1:276973792433:web:c2ea22d9f080989d5d0690"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
