import * as TogglActions from './toggl';
import { ActionTypes } from '../config/constants';
import { isOrgMember } from '../helpers/github';
import { ref, firebaseAuth } from '../config/constants'

export function logout() {
  return dispatch => {
    return firebaseAuth().signOut().then(() => {
      dispatch({ type: ActionTypes.SIGN_OUT });
    });
  }
}

export function login() {
  return dispatch => {
    const provider = new firebaseAuth.GithubAuthProvider();
    provider.addScope('read:org');

    return firebaseAuth().signInWithPopup(provider).then(payload => {
      const { user } = payload;
      ref.child(`users/${user.uid}/creds`).set({
        accessToken: payload.credential.accessToken,
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      });

      dispatch(verifyOrg(payload.credential.accessToken));
    });
  }
}

function verifyOrg(token, org) {
  return dispatch => {
    isOrgMember(token, org).then(isMember => {
      if (!isMember) {
        dispatch(logout());
        dispatch({
          type: ActionTypes.ERROR,
          payload: {
            type: 'auth',
            message: `Login failed. Make sure you are a member of the GitHub organization and have granted this app access to it.`,
          },
        });
      } 
    });
  };
}

let removeListener = () => {};
export const subscribe = () => {
  return dispatch => {
    removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: ActionTypes.SIGN_IN, payload: user });
        dispatch(TogglActions.subscribe(user.uid));
      } else {
        dispatch({ type: ActionTypes.LOADED });
      }
    })
  }
};

export const unsubscribe = () => {
  return dispatch => {
    removeListener();
  }
};
