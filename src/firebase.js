import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA36UeaAy7aJ-fsDoJMMd2OHopxe9lr0ew",
    authDomain: "reactprojects-12bbe.firebaseapp.com",
    databaseURL: "https://reactprojects-12bbe-default-rtdb.firebaseio.com",
    projectId: "reactprojects-12bbe",
    storageBucket: "reactprojects-12bbe.appspot.com",
    messagingSenderId: "742066518833",
    appId: "1:742066518833:web:907ec87d75dc119e9d4e10",
    measurementId: "G-3DJ3W5G6RN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerGithub = new firebase.auth.GithubAuthProvider();

export { db, auth, storage, providerGithub, providerGoogle };
