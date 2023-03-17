import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// // Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVCT93XXdXKM0tNIYTAndCvmfVPBkMrFE",
  authDomain: "chatgpt-clone-16dc0.firebaseapp.com",
  projectId: "chatgpt-clone-16dc0",
  storageBucket: "chatgpt-clone-16dc0.appspot.com",
  messagingSenderId: "919861355922",
  appId: "1:919861355922:web:88345d80eac71ddf9e4d4b",
};

// Initialize Firebase

// const app = initializeApp(firebaseConfig);

//We use the above way in React, but in NextJs, use the below way to initialise

//This ensures that we first check if there are any
//Initialised apps before initialising the app
//If there is an already existing initialised app, then use that

//This is called the Singleton pattern in coding

//Singleton pattern restricts the instantiation of a
// class and ensures that only one instance of the class
// exists in the Java Virtual Machine. The singleton class
//  must provide a global access point to get the instance
//  of the class. Singleton pattern is used for logging,
//  drivers objects, caching, and thread pool.

//Basically check if there is a length in getApps
//If there is, it means there is an already initialised app
//Then use that
//If there isn't, then initialise this app
//This ensures that we get only a single instance of the app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
