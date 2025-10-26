// firebase.js
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUJRABXgbZ2beGLyFZAxcxNLl_GOwlPeQ",
  authDomain: "idrs-student.firebaseapp.com",
  projectId: "idrs-student",
  storageBucket: "idrs-student.firebasestorage.app",
  messagingSenderId: "1092177042132",
  appId: "1:1092177042132:web:1e7a0a7b5b362ca7177941",
  measurementId: "G-CKDBWTY8EV",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
