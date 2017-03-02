import { ref, firebaseAuth } from '../config/constants'

const provider = new firebaseAuth.GithubAuthProvider();
provider.addScope('read:org');

export function logout () {
  return firebaseAuth().signOut()
}

export function login() {
  return firebaseAuth().signInWithPopup(provider);
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
