            

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD6Fgj503jvdErk_M_7WaR5lXTd5fceYD8",
    authDomain: "instagram-clone-3efe3.firebaseapp.com",
    databaseURL: "https://instagram-clone-3efe3.firebaseio.com",
    projectId: "instagram-clone-3efe3",
    storageBucket: "instagram-clone-3efe3.appspot.com",
    messagingSenderId: "1077740671708",
    appId: "1:1077740671708:web:a2c864b39d87dd64f35a19",
    measurementId: "G-ZFXKHMR794"

  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth , storage};
  