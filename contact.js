
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoOWbYpsJ947VCIFH1AuUjrsy1Cuxi3i4",
  authDomain: "contactfoodico.firebaseapp.com",
  databaseURL: "https://contactfoodico-default-rtdb.firebaseio.com",
  projectId: "contactfoodico",
  storageBucket: "contactfoodico.appspot.com",
  messagingSenderId: "751150884436",
  appId: "1:751150884436:web:21b96add52751b08486fc1",
  measurementId: "G-LRH32FBBL2"
    };
  
  
    firebase.initializeApp(firebaseConfig);
  
    var contactFormDB = firebase.database().ref("contactForm");
    
    document.getElementById("contactForm").addEventListener("submit", submitForm);
    
    function submitForm(e) {
      e.preventDefault();
    
      var name = getElementVal("name");
      var emailid = getElementVal("emailid");
      var msgContent = getElementVal("msgContent");
    
      saveMessages(name, emailid, msgContent);
    
      //   enable alert
      document.querySelector(".alert").style.display = "block";
    
      //   remove the alert
      setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 3000);
    
      //   reset the form
      document.getElementById("contactForm").reset();
    }
    
    const saveMessages = (name, emailid, msgContent, phone) => {
      var newContactForm = contactFormDB.push();
    
      newContactForm.set({
        name: name,
        phone: phone,
        emailid: emailid,
        msgContent: msgContent,
      });
    };
    
    const getElementVal = (id) => {
      return document.getElementById(id).value;
    };