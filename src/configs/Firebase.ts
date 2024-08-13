import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAkHMBMBQuaF2NM8S-6x6HQO0JIzyv81ng",
  authDomain: "doit-1989c.firebaseapp.com",
  projectId: "doit-1989c",
  storageBucket: "doit-1989c.appspot.com",
  messagingSenderId: "965263621096",
  appId: "1:965263621096:web:b4ea57ad9b6099419d425d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth()
export default app


