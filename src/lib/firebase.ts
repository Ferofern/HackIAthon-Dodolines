import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrAa4uroT9gg71CxehO6LNfI0eiQw1qv8",
  authDomain: "hackiathondodolandia.firebaseapp.com",
  projectId: "hackiathondodolandia",
  storageBucket: "hackiathondodolandia.firebasestorage.app",
  messagingSenderId: "476593368903",
  appId: "1:476593368903:web:2ad331fa39466475502662",
  measurementId: "G-SRLGRZ6LEY"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };