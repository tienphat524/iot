// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAghlwsY210z4g6WYTB0w-JSbaUmBTPz9s",
  authDomain: "test-3cca0.firebaseapp.com",
  databaseURL: "https://test-3cca0-default-rtdb.firebaseio.com",
  projectId: "test-3cca0",
  storageBucket: "test-3cca0.appspot.com",
  messagingSenderId: "1919047602",
  appId: "1:1919047602:web:74bec99d9ce727302fb6ab",
  measurementId: "G-ZMNPY34VNB"
};

let app  = firebase.initializeApp(firebaseConfig);
firebase.firestore()
.enablePersistence({ synchronizeTabs: !0 })
.catch(() => {
  console.warn("DB offline support not available");
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db  = firebase.database();
export const productCollection = db.ref("data/product");
export const lm35Collection = db.ref("sensor/lm35");
export const dhtTempCollection = db.ref("sensor/dhtTemp");
export const dhtHumCollection = db.ref("sensor/dhtHum");
export const lightCollection = db.ref("sensor/light");
export const soilCollection = db.ref("sensor/soil");
export const pump1Status = db.ref("status/pump1Status");
export const pump2Status = db.ref("status/pump2Status");
export const fanStatus = db.ref("status/fanStatus");
export const motorStatus = db.ref("status/motorStatus");
export default {
  firebase: firebase,
  firestore: firebase.firestore(),
}