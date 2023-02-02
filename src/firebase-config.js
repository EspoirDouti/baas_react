import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg6TUZNaAN_vcleGQkBi5-Dkf_E4XYgZY",
  authDomain: "baas-reactjs.firebaseapp.com",
  projectId: "baas-reactjs",
  storageBucket: "baas-reactjs.appspot.com",
  messagingSenderId: "556652762753",
  appId: "1:556652762753:web:fe57746cffd430421cdf80",
  measurementId: "G-RNGZ77BTTV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
