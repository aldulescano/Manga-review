import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDI8XzExRlsUbHsXxend5TG7A7JNqv56x8",
    authDomain: "manga-review.firebaseapp.com",
    projectId: "manga-review",
    storageBucket: "manga-review.appspot.com",
    messagingSenderId: "796969315322",
    appId: "1:796969315322:web:5a290f7185092490a39243"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();