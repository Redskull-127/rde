// Import the functions you need from the SDKs you need
import 'https://smtpjs.com/v3/smtp.js';
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
  annfb: false,
  annlink: '#',
  titan_id: '',
  titan_pass: '',
  titan_body: '',
  titan_sub: ''
};

const ann = document.getElementById('ann');
const testing = document.getElementById('testing');
const getemail = document.getElementById('getemail');
const showinfo = document.getElementById('successdiv');
let showinfotxt = document.getElementById('success');
let emailvalue = document.getElementById('exampleFormControlInput1');
const emailbutton = document.getElementById('emailbutton');
emailbutton.addEventListener('click',function(){
  getemail.style.display = "none";
  showinfo.style.display = "block";
  showinfotxt.innerHTML = "<center><h1>Please Wait!</h1></center>"
  Email.send({
    Host: "smtp.titan.email",
    port: 465,
    Username : titan_id,
    Password : titan_pass,
    To : emailvalue.value,
    From : titan_id,
    Subject : titan_sub,
    Body : titan_body,
    }).then(
      showinfotxt.innerHTML = "<center><h1>Success!</h1><br/><h1>Check Your Mail!</h1></center>"
    ).catch((errorinfo) => {
      showinfotxt.innerHTML = errorinfo;
      console.log(errorinfo);
    });
})
let titan_id;
let titan_pass;
let titan_body;
let titan_sub;

fetchAndActivate(remoteConfig)
  .then(() => {
    const anno = getValue(remoteConfig, "annfb").asBoolean();
    if (anno) {
      console.log("True");
      ann.innerHTML = 'Register Now...'
      const annolink = getValue(remoteConfig, "annlink").asString();
      ann.addEventListener('click', function(){
         getemail.style.display = "block";
      })
    } else {
      console.log("False");
      ann.innerHTML = 'Registration Will Open Soon...'
      ann.addEventListener('click',function(){
        alert("Registration Not Opened Yet");
      })
    }
    titan_id = getValue(remoteConfig, "titan_id").asString();
    titan_pass = getValue(remoteConfig, "titan_pass").asString();
    titan_body = getValue(remoteConfig, "titan_body").asString();
    titan_sub = getValue(remoteConfig, "titan_sub").asString();
  })
  .catch((err) => {
    console.log(err)
  });

  // function sendEmail() {
  //   Email.send({
  //   Host: "smtp.titan.email",
  //   port: 465,
  //   Username : titan_id,
  //   Password : titan_pass,
  //   To : 'meerraja17@gmail.com',
  //   From : titan_id,
  //   Subject : "Working Bruh",
  //   Body : titan_body,
  //   }).then(
  //     function(){alert("mail sent successfully")}
  //   );
  // }

  // testing.addEventListener('click', function() {
  //   sendEmail();
  // })