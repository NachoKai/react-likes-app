import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCdevtJAXbq-bd59KGr06i4mncbSJPjgi8',
  authDomain: 'react-hector-bliss.firebaseapp.com',
  databaseURL: 'https://react-hector-bliss.firebaseio.com',
  projectId: 'react-hector-bliss',
  storageBucket: 'react-hector-bliss.appspot.com',
  messagingSenderId: '479725401674',
  appId: '1:479725401674:web:0877497994de92b9ecd8b3',
  measurementId: 'G-RGJ11BJCHW',
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore().collection('favs');

export const getFavs = async uid => {
  try {
    const snap = await db.doc(uid).get();
    return snap.data().array;
  } catch (err) {
    return console.error(err);
  }
};

export const updateDB = (array, uid) => db.doc(uid).set({ array });

export const loginWithGoogle = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  try {
    let snapshot = await firebase.auth().signInWithPopup(provider);
    return snapshot.user;
  } catch (err) {
    return console.error(err);
  }
};

export const signOutGoogle = () => {
  firebase.auth().signOut();
};
