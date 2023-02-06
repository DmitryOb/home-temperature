// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK5v_86oywKnTeXDSVVXmqUd-11BIGLGI",
  authDomain: "esp-firebase-demo-b3ce9.firebaseapp.com",
  databaseURL: "https://esp-firebase-demo-b3ce9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "esp-firebase-demo-b3ce9",
  storageBucket: "esp-firebase-demo-b3ce9.appspot.com",
  messagingSenderId: "830317942872",
  appId: "1:830317942872:web:e0f72d49eb52823b28122d"
};

const app = initializeApp(firebaseConfig);
export default app;
