const firebaseConfig = {
    apiKey: "AIzaSyBk0QwkJRANjKpHft4cIxzjcf5a7MD2hEQ",
    authDomain: "my-first-project-a8e32.firebaseapp.com",
    projectId: "my-first-project-a8e32",
    storageBucket: "my-first-project-a8e32.appspot.com",
    messagingSenderId: "324634292762",
    appId: "1:324634292762:web:d7902a56319dcc796197a3"
  };

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const authForm = document.querySelector("#authForm");
const secretContent = document.querySelector("#secretContent");
const userInfo = document.querySelector("#userInfo");
const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

secretContent.style.display = "none";

const userSignUp = async () => {
    const signUpEmail = userEmail.value;
    const signUpPassword = userPassword.value;

    // Check if the email is already in use
    const existingUser = await auth.fetchSignInMethodsForEmail(signUpEmail);
    if (existingUser.length > 0) {
        alert("This email address is already registered. Please use a different email.");
        return;
    }

    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert("Your account has been created!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        });
};

const userSignIn = async () => {
    const signInEmail = userEmail.value;
    const signInPassword = userPassword.value;

    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("You have signed in successfully!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        });
};

const checkAuthState = async