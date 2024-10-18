import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNu_DVcgzNikpa16QUs3OAkNlbTTSLgJA",
  authDomain: "fitness-app-trial.firebaseapp.com",
  projectId: "fitness-app-trial",
  storageBucket: "fitness-app-trial.appspot.com",
  messagingSenderId: "115841742796",
  appId: "1:115841742796:web:c231b8bd11ff1fd468cf69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)