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

export const ActionTypes = {
  ERROR: 'ERROR',
  FIREBASE_SET_ERROR: 'FIREBASE_SET_ERROR',
  FIREBASE_SET_REQUEST: 'FIREBASE_SET_REQUEST',
  FIREBASE_SET_SUCCESS: 'FIREBASE_SET_SUCCESS',
  LOADED: 'LOADED',
  PROJECTS_UPDATE: 'PROJECTS_UPDATE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  TICKETS_REMOVE: 'TICKETS_REMOVE',
  TICKETS_SEARCH: 'TICKETS_SEARCH',
  TICKETS_SUBSCRIBE: 'TICKETS_SUBSCRIBE',
  TICKETS_UPDATE: 'TICKETS_UPDATE',
  TICKETS_DISPATCH: 'TICKETS_DISPATCH',
  TICKETS_DISPATCH_SUCCESS: 'TICKETS_DISPATCH_SUCCESS',
  TICKET_UPDATE: 'TICKET_UPDATE',
  TICKET_UPDATE_SINGLE: 'TICKET_UPDATE_SINGLE',
  TICKET_UPDATE_CLEAR: 'TICKET_UPDATE_CLEAR',
  TICKET_UPDATE_SUCCESS: 'TICKET_UPDATE_SUCCESS',
  PROJECT_TICKETS_UPDATE: 'PROJECT_TICKETS_UPDATE',
  PROJECT_TICKETS_UPDATE_SUCCESS: 'PROJECT_TICKET_UPDATE_SUCCESS',
  TOGGL_START: 'TOGGL_START',
  USER_UPDATE: 'USER_UPDATE',
  THEME: 'THEME',
  TIMESHEETS_SEARCH: 'TIMESHEETS_SEARCH',
  TIMESHEETS_SEARCH_SUCCESS: 'TIMESHEETS_SEARCH_SUCCESS',
};
