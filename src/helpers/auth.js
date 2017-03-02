import { actions } from '../config/constants';
import { dispatch } from '..';
import { isOrgMember } from './github';
import { ref, firebaseAuth } from '../config/constants'

export function logout() {
  return dispatch => {
    return firebaseAuth().signOut().then(() => {
      dispatch({ type: actions.SIGN_OUT });
    });
  }
}

export function login() {
  return dispatch => {
    const provider = new firebaseAuth.GithubAuthProvider();
    provider.addScope('read:org');

    return firebaseAuth().signInWithPopup(provider).then(payload => {
      const { user } = payload;
      ref.child(`users/${user.uid}`).set({
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
          type: actions.ERROR,
          payload: {
            type: 'auth',
            message: `Login failed. Make sure you are a member of the GitHub organization and have granted this app access to it.`,
          },
        });
      } 
    });
  };
}
