import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCF78gOmuQrMGYWk-9b35OIm2YKgDXWgvo",
  authDomain: "chat-application-2de87.firebaseapp.com",
  databaseURL: "https://chat-application-2de87-default-rtdb.firebaseio.com",
  projectId: "chat-application-2de87",
  storageBucket: "chat-application-2de87.appspot.com",
  messagingSenderId: "750093839621",
  appId: "1:750093839621:web:1577412750792a4160db6c",
  measurementId: "G-H715CS3ZDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);