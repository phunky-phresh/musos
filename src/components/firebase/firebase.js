import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var firebaseConfig = {
  apiKey: "AIzaSyDaA2nqpfNgHkoZICY3oTBi--L4uLllUCc",
  authDomain: "musos-8f0c3.firebaseapp.com",
  databaseURL: "https://musos-8f0c3.firebaseio.com",
  projectId: "musos-8f0c3",
  storageBucket: "musos-8f0c3.appspot.com",
  messagingSenderId: "516208856704",
  appId: "1:516208856704:web:0a227dfb24c6770f206065",
  measurementId: "G-8DK7B27L6M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
