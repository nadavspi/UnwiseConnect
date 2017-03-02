import { ref, firebaseAuth } from '../config/constants'
import { isOrgMember } from './github';

export function logout () {
  console.log('logging out');
  return firebaseAuth().signOut();
}

export function login() {
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

    verifyOrg(payload.credential.accessToken);
  });
}

function verifyOrg(token, org) {
  isOrgMember(token, org).then(isMember => {
    if (!isMember) {
      // need to also change the authed state
      logout();
    } 
  });
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
    })
    .then(() => user)
}
