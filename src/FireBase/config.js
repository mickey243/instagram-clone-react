import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAFJjL550rswHMQaWhpdRuzsechafxtAuw",
  authDomain: "instagram-clone-babd2.firebaseapp.com",
  projectId: "instagram-clone-babd2",
  storageBucket: "instagram-clone-babd2.appspot.com",
  messagingSenderId: "680001941825",
  appId: "1:680001941825:web:b3c7ce297a59ad0a87f1c0"
};
// Initialize Firebase
const data = firebase.initializeApp(firebaseConfig);
const db = data.firestore();
const auth = data.auth();
const storage = data.storage();

export { db, auth, storage };