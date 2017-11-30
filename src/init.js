import firebase from 'firebase';

export default function() {
  firebase.initializeApp({
    apiKey: "AIzaSyAAUfO2XdfTjNaQdgaAXFzz39dD2vufo8M",
    authDomain: "diaries-37b52.firebaseapp.com",
    databaseURL: "https://diaries-37b52.firebaseio.com",
    projectId: "diaries-37b52",
    storageBucket: "diaries-37b52.appspot.com",
    messagingSenderId: "852047106705"
  });
}
