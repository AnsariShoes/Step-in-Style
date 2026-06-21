import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3UMT0JP8igOWlAjnmdDMhd6SHYDOyPyU",
  authDomain: "ansari-shoes.firebaseapp.com",
  projectId: "ansari-shoes",
  storageBucket: "ansari-shoes.firebasestorage.app",
  messagingSenderId: "401541634597",
  appId: "1:401541634597:web:a323fdf0ada69c8ba53dcc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
