// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAyYaM3LmkK2SSTPEkt8wzsplznN6iSTU",
  authDomain: "greentailors-1ab8f.firebaseapp.com",
  projectId: "greentailors-1ab8f",
  storageBucket: "greentailors-1ab8f.appspot.com",
  messagingSenderId: "14427045705",
  appId: "1:14427045705:web:75e46ce647ffbe5677a498",
  measurementId: "G-7SDZZE9VV6",
};

// export { storage };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
