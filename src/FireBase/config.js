import firebase from "firebase";
var firebaseConfig = {
#Add FireBase Key
};
// Initialize Firebase
const data = firebase.initializeApp(firebaseConfig);
const db = data.firestore();
const auth = data.auth();
const storage = data.storage();

export { db, auth, storage };
