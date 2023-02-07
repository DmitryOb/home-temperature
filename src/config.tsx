import { initializeApp } from "firebase/app";

const firebaseConfig = {
  databaseURL: "https://esp-firebase-demo-b3ce9-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

export default app;

// if later we want wrote data to DB then auth and expand firebaseConfig (check project app config in FB dashboard)
// auth example https://firebase.google.com/docs/auth/web/anonymous-auth?hl=en&authuser=0
// const auth = getAuth();
// signInAnonymously(auth).then(() => {console.log('AUTH')}).catch((error) => {console.log(error)});
