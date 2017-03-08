import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
window.ref = ref;
window.firebaseAuth = firebaseAuth;

export const ActionTypes = {
  ERROR: 'ERROR',
  LOADED: 'LOADED',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  TICKETS_SEARCH: 'TICKETS_SEARCH',
  TICKETS_SUBSCRIBE: 'TICKETS_SUBSCRIBE',
  TICKETS_UPDATE: 'TICKETS_UPDATE',
};
