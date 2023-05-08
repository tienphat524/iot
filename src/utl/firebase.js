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
  apiKey: "AIzaSyD8DFQJarbBjNkYWdAMYRdAx0sKwUdYJbc",
  authDomain: "sensor-7aff3.firebaseapp.com",
  databaseURL: "https://sensor-7aff3-default-rtdb.firebaseio.com",
  projectId: "sensor-7aff3",
  storageBucket: "sensor-7aff3.appspot.com",
  messagingSenderId: "495413132807",
  appId: "1:495413132807:web:bd1e906a318100dbcf34a2",
  measurementId: "G-KW1B8228MW"
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
export const lm35Collection = db.ref("sensor/lm35Temp");
export const dhtTempCollection = db.ref("sensor/dhtTemp");
export const dhtHumCollection = db.ref("sensor/dhtHum");
export const lightCollection = db.ref("sensor/light");
export const soilCollection = db.ref("sensor/soil");
export const pump1Status = db.ref("status/pump1Status");
export const pump2Status = db.ref("status/pump2Status");
export const fanStatus = db.ref("status/fanStatus");
export const motorStatus = db.ref("status/motorStatus");
export const mode = db.ref("mode");
export const closeSwitch = db.ref("system/closeSwitch");
export const openSwitch = db.ref("system/openSwitch");
export const settingThreshold = db.ref("settingThreshold")
export default {
  firebase: firebase,
  firestore: firebase.firestore(),
}