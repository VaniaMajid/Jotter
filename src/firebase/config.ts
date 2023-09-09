import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtVj3a4AxT0hMAG_A-a-cXPelcrs608Go",
  authDomain: "dashboard-9e36b.firebaseapp.com",
  projectId: "dashboard-9e36b",
  storageBucket: "dashboard-9e36b.appspot.com",
  messagingSenderId: "782352975839",
  appId: "1:782352975839:web:4c44f4d5c65698aaefa66a",
  measurementId: "G-046KHF2WPQ",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export {
  app, auth, database, storage,
};
