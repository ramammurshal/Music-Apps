// core firebase
import firebase from "firebase/app";

// import firebase services
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnQItWDrTovHF3Md6GpBFJVyu7jmJT-6k",
  authDomain: "music-apps-e3935.firebaseapp.com",
  projectId: "music-apps-e3935",
  storageBucket: "music-apps-e3935.appspot.com",
  messagingSenderId: "219262840257",
  appId: "1:219262840257:web:93dc4690959dd5b4dad340",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// init timestamps
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
