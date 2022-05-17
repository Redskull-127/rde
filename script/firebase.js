// Import the functions you need from the SDKs you need
import "https://smtpjs.com/v3/smtp.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
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
const db = getFirestore(app);


remoteConfig.settings = {
  fetchTimeMillis: 60000,
  minimumFetchIntervalMillis: 1,
};

remoteConfig.defaultConfig = {
  annfb: false,
  annlink: "#",
  titan_id: "",
  titan_pass: "",
  titan_body: "",
  titan_sub: "",
};

const ann = document.getElementById("ann");
const testing = document.getElementById("testing");
const getemail = document.getElementById("getemail");
const showinfo = document.getElementById("successdiv");
let showinfotxt = document.getElementById("success");
let emailvalue = document.getElementById("exampleFormControlInput1");

const emailbutton = document.getElementById("emailbutton");
const username = document.getElementById("exampleFormControlInput2");

emailbutton.addEventListener("click", function () {
  getemail.style.display = "none";
  showinfo.style.display = "block";
  showinfotxt.innerHTML = "<center><h1>Please Wait!</h1></center>";
  if(emailvalue.value == '' || username.value == ''){
    showinfotxt.innerHTML = "<center><h1>Please Enter Required Details!</h1></center>";
    console.log("working")
  }
  else
  {
    Email.send({
    Host: "smtp.titan.email",
    port: 465,
    Username: titan_id,
    Password: titan_pass,
    To: emailvalue.value,
    From: titan_id,
    Subject: username.value + ',' + titan_sub,
    Body: titan_body,
  })
    .then(
      (showinfotxt.innerHTML =
        "<center><h1>Success!</h1><br/><h1>Check Your Mail!</h1></center>")
    )
    .catch((errorinfo) => {
      showinfotxt.innerHTML = errorinfo;
      console.log(errorinfo);
    });
    try {
      const docRef =  addDoc(collection(db, "users"), {
        email : emailvalue.value,
        name : username.value
      });
      console.log("Document written with ID: ", docRef.id);
      showinfotxt.innerHTML =
        "<center><h1>Success!</h1><br/><h1>Check Your Mail!</h1></center>"
    } catch (e) {
      console.error("Error adding Registration: ", e);
      showinfotxt.innerHTML =
        "<center><h1>Error!</h1><br/><h1>Registration Failed</h1></center>"
    }
  }
});
let titan_id;
let titan_pass;
let titan_body;
let titan_sub;

fetchAndActivate(remoteConfig)
  .then(() => {
    const anno = getValue(remoteConfig, "annfb").asBoolean();
    if (anno) {
      console.log("True");
      ann.innerHTML = "Register Now...";
      const annolink = getValue(remoteConfig, "annlink").asString();
      ann.addEventListener("click", function () {
        getemail.style.display = "block";
      });
    } else {
      console.log("False");
      ann.innerHTML = "Registration Will Open Soon...";
      ann.addEventListener("click", function () {
        alert("Registration Not Opened Yet");
      });
    }
    titan_id = getValue(remoteConfig, "titan_id").asString();
    titan_pass = getValue(remoteConfig, "titan_pass").asString();
    titan_body = getValue(remoteConfig, "titan_body").asString();
    titan_sub = getValue(remoteConfig, "titan_sub").asString();
  })
  .catch((err) => {
    console.log(err);
  });
  const querySnapshot = await getDocs(collection(db, "gitgithub"));
  let counter = 0;
  querySnapshot.forEach((doc) => {
    counter++;
  });
  if(counter == 300){
    Email.send({
      Host: "smtp.titan.email",
      port: 465,
      Username: titan_id,
      Password: titan_pass,
      To: "meerraja17@gmail.com",
      From: titan_id,
      Subject: "Warning!!!",
      Body: "Warning Registrations Are Over 300!!!",
    })
  }