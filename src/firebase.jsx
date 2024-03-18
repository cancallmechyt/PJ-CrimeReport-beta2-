import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCe3t3sWWq-LjP9pleMi8U4ZYF0m9e2MCQ",
  authDomain: "firevase-crud.firebaseapp.com",
  databaseURL: "https://firevase-crud-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firevase-crud",
  storageBucket: "firevase-crud.appspot.com",
  messagingSenderId: "569258208388",
  appId: "1:569258208388:web:3f934edd4522910c1066d1",
  measurementId: "G-VJTT8577LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)