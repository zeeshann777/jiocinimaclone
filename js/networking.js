
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

class authentication
{
    constructor(){

// Your web app's Firebase configuration
    this.firebaseConfig = {
    apiKey: "AIzaSyDymxLOvkzV9muJLm3HNPaO0S7xarpiGN4",
    authDomain: "jiocinemaclone.firebaseapp.com",
    projectId: "jiocinemaclone",
    storageBucket: "jiocinemaclone.appspot.com",
    messagingSenderId: "1067123666435",
    appId: "1:1067123666435:web:587e43ebeb833ccbb66836"
    };

// Initialize Firebase
    this.app = initializeApp(this.firebaseConfig);
    }

    login = (email, password) => {
        const auth = getAuth();
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
                if(errorCode == "auth/network-request-failed")
                {
                    alert("check your network connection")
                }
                else
                {
                    alert("check your email and password")
                }
            });
    }
}

export {authentication}