import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD0kE5BW5xuyp21lY9dpP11EIiz-4JaJig",
  authDomain: "esp-firebase-demo-b3ce9.firebaseapp.com",
  databaseURL: "https://esp-firebase-demo-b3ce9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "esp-firebase-demo-b3ce9",
  storageBucket: "esp-firebase-demo-b3ce9.appspot.com",
  messagingSenderId: "830317942872",
  appId: "1:830317942872:web:e0f72d49eb52823b28122d"
};

const app = initializeApp(firebaseConfig);

export default app;
