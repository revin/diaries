import firebase from 'firebase';
import init from './init';

init();

// set up the auth provider
let  provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

// make sure the user's uid => displayName mapping is saved
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userRef = firebase.database().ref('users/' + user.uid);
    userRef.once('value', snapshot => {
      userRef.set(user.displayName).then(() => console.log('saved user', user.uid, user.displayName));
    });
  }
});

const auth = {
  login() {
    return firebase.auth().signInWithRedirect(provider);
  },

  logout() {
    return firebase.auth().signOut();
  },

  isLoggedIn() {
    return !!(auth.getUser());
  },

  getUser() {
    return firebase.auth().currentUser;
  }
};

export default auth;
