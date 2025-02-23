// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsSisFEy_eKpSZ9mH4gjQWXWIqLO1xPJM",
  authDomain: "back-buddy-9a246.firebaseapp.com",
  projectId: "back-buddy-9a246",
  storageBucket: "back-buddy-9a246.appspot.com",
  messagingSenderId: "475856417258",
  appId: "1:475856417258:ios:1cd6f50dd27f90959dc293"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export { auth };
