// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXymZew5xYQ-8zqgLQ925IcB77jP5Y4mY",
  authDomain: "dropservice-99b2d.firebaseapp.com",
  projectId: "dropservice-99b2d",
  storageBucket: "dropservice-99b2d.appspot.com",
  messagingSenderId: "1019796622482",
  appId: "1:1019796622482:web:36d63d1ffe292519ec6a4b",
  measurementId: "G-H80RZYHL7W"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// const analytics = getAnalytics(firebaseApp);

export {timestamp};
export default firebaseApp.firestore();