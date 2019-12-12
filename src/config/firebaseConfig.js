import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyBQMJBm-G5JyMu3Xy15eVQzHmr0UUxIy0k",
  authDomain: "wireframer-be32e.firebaseapp.com",
  databaseURL: "https://wireframer-be32e.firebaseio.com",
  projectId: "wireframer-be32e",
  storageBucket: "wireframer-be32e.appspot.com",
  messagingSenderId: "827958662267",
  appId: "1:827958662267:web:66d150225bb91cfb9d3ede",
  measurementId: "G-20M86XSK34"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;