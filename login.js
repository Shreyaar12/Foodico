// Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY3lgxaGHp2nL7eq6H8IESdcsLFk6FpN0",
  authDomain: "foodico-93201.firebaseapp.com",
  projectId: "foodico-93201",
  storageBucket: "foodico-93201.appspot.com",
  messagingSenderId: "649175840578",
  appId: "1:649175840578:web:4840358779ec0a45143adb",
  measurementId: "G-JTP8GTWE08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = firebase.auth();
// Set up our register function
const database = firebase.database();
function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;
  favourite_song = document.getElementById("favourite_song").value;
  milk_before_cereal = document.getElementById("milk_before_cereal").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }
  if (
    validate_field(full_name) == false ||
    validate_field(favourite_song) == false ||
    validate_field(milk_before_cereal) == false
  ) {
    alert("One or More Extra Fields is Outta Line!!");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        favourite_song: favourite_song,
        milk_before_cereal: milk_before_cereal,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      alert("User Created!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // DOne
      alert("User Logged In!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

// function signup() {
//   var email = document.getElementById("email");
//   var password = document.getElementById("password");
//   const promise = auth.createUserwithEmailandPassword(
//     email.value,
//     password.value
//   );
//   promise.catch((e) => alert(e.message));
//   alert("Signed up");
// }
// document.getElementById("btn").addEventListener("click", function (event) {
//   event.preventDefault();
// });
