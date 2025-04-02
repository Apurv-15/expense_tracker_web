import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaSalftbxxLLUZHvNrpoWVGHeKigEYCE4",
    authDomain: "expensetracker-e539b.firebaseapp.com",
    databaseURL: "https://expensetracker-e539b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expensetracker-e539b",
    storageBucket: "expensetracker-e539b.firebasestorage.app",
    messagingSenderId: "549967895909",
    appId: "1:549967895909:web:edfb7769417b4951eb558c",
    measurementId: "G-SGPP5C68WT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
