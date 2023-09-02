
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDymxLOvkzV9muJLm3HNPaO0S7xarpiGN4",
    authDomain: "jiocinemaclone.firebaseapp.com",
    projectId: "jiocinemaclone",
    storageBucket: "jiocinemaclone.appspot.com",
    messagingSenderId: "1067123666435",
    appId: "1:1067123666435:web:587e43ebeb833ccbb66836"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const login = () => {
    const auth = getAuth();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("login successfull");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("please check your email and password")
        });
}

const loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click",()=>{
    login();
});
