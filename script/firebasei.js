// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-performance.js";
import {
  getRemoteConfig,
  getValue,
  fetchAndActivate,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-remote-config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo8Uk1dqUUYitL7nLZX8X2DaPVJsnRzDQ",
  authDomain: "rde-club.firebaseapp.com",
  projectId: "rde-club",
  storageBucket: "rde-club.appspot.com",
  messagingSenderId: "54088217334",
  appId: "1:54088217334:web:afc92801dd5ad8a6d4b2d7",
  measurementId: "G-Q8HB92LX0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const perf = getPerformance(app);
const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  fetchTimeMillis: 60000,
  minimumFetchIntervalMillis: 1,
};

remoteConfig.defaultConfig = {
    news : '!'
};

const alertfb = document.getElementById('alertfb');
const alertbox = document.getElementById('alertbox');
fetchAndActivate(remoteConfig)
  .then(() => {
   const newsfb = getValue(remoteConfig, "news").asString();
   if(newsfb != 'null'){
       alertfb.innerHTML = newsfb;
   }
   else{
        alertbox.style.display = "none";
   }
  })
  .catch((err) => {
    console.log(err)
  });
