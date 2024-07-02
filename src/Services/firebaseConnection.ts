import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoXJZMGODNmkwYWKfPkddn3GiQ_QmB0Wk",
  authDomain: "devlinks-91b23.firebaseapp.com",
  projectId: "devlinks-91b23",
  storageBucket: "devlinks-91b23.appspot.com",
  messagingSenderId: "600123284099",
  appId: "1:600123284099:web:0c38fc6e78f6af552919b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };
