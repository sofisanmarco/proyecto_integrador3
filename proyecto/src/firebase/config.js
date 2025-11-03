import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDBB-ne5ch7ip2Ry2MlHZqJ3wOIeUzlTD8",
  authDomain: "proyectointegrador-8c724.firebaseapp.com",
  projectId: "proyectointegrador-8c724",
  storageBucket: "proyectointegrador-8c724.firebasestorage.app",
  messagingSenderId: "98364802333",
  appId: "1:98364802333:web:6181a2baa2813c6c1f0df4"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
