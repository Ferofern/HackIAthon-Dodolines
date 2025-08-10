import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAolclUngmoZYW-Cj_xHbEJYQrZENGxNec",
  authDomain: "hackiathon-d1f93.firebaseapp.com",
  projectId: "hackiathon-d1f93",
  storageBucket: "hackiathon-d1f93.firebasestorage.app",
  messagingSenderId: "501512249751",
  appId: "1:501512249751:web:b02f08b3e8602af3b8e4d2",
  measurementId: "G-CTK9SLZWW6"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };