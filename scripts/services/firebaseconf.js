//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmstNG-LeC4d1IvPKZgeAqTmBwiZbcsHE",
    authDomain: "myproject1-8eed5.firebaseapp.com",
    projectId: "myproject1-8eed5",
    storageBucket: "myproject1-8eed5.appspot.com",
    messagingSenderId: "931123140940",
    appId: "1:931123140940:web:b46d4a0f3574d69d1517e9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

//export default db;