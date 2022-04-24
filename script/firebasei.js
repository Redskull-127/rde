// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-performance.js";
import { collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app-check.js";
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
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdEZ5YfAAAAAFbBJ9zqAuRWvyuvkAxH0HspUtUq'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

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


const idp = document.getElementById('idp');
const admin = document.getElementById('admin');
const rdemail = document.getElementById('emailrde');
const passrde = document.getElementById('passrde');
const loginbtn = document.getElementById('loginrde');
loginbtn.addEventListener('click', function(){
  signInWithEmailAndPassword(auth, rdemail.value, passrde.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    idp.style.display = "none";
    admin.style.display = "block";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    idp.innerHTML = '<h1>Error</h1><br/><p>' + error.code + '<br/>' + error.message;
  });
})

// const docRef = doc(db, "user", "email");
const querySnapshot = await getDocs(collection(db, "users"));
let counter = 0;
querySnapshot.forEach((doc) => {
  counter++;
});
const usercount = document.getElementById('usercount');

if(counter == 0){
  usercount.innerHTML = "Please Wait!!!";  
}
else{usercount.innerHTML = counter;}

const pptbtn = document.getElementById('pptbtn');
const storageRef = ref(storage , 'RDEPPT.pptx');
pptbtn.addEventListener('click', function(){
  getDownloadURL(storageRef)
  .then((url) => {
    download(url, 'RDEPPT.pptx');
  })
  .catch((error) => {
  });
})
const download = (path, filename) => {
  // Create a new link
  const anchor = document.createElement('a');
  anchor.href = path;
  anchor.download = filename;

  // Append to the DOM
  document.body.appendChild(anchor);

  // Trigger `click` event
  anchor.click();

  // Remove element from DOM
  document.body.removeChild(anchor);
}; 