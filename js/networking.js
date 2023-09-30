
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";


class authentication
{
    constructor(){

// Your web app's Firebase configuration
    this.firebaseConfig = {
    apiKey: "AIzaSyDymxLOvkzV9muJLm3HNPaO0S7xarpiGN4",
    authDomain: "jiocinemaclone.firebaseapp.com",
    databaseURL: "https://jiocinemaclone-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jiocinemaclone",
    storageBucket: "jiocinemaclone.appspot.com",
    messagingSenderId: "1067123666435",
    appId: "1:1067123666435:web:587e43ebeb833ccbb66836"
    };

// Initialize Firebase
    this.app = initializeApp(this.firebaseConfig);
    
    this.auth = getAuth();
    }

    login = (email, password) => {
        signInWithEmailAndPassword(this.auth, email, password)
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

    signin = (email,password)=>
    {
        createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("login successfull");
        // ...
        }).catch((error) => {
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
        // ..
        });
    }
}

class database{
    constructor()
    {
        this.firebaseConfig = {
            apiKey: "AIzaSyDymxLOvkzV9muJLm3HNPaO0S7xarpiGN4",
            authDomain: "jiocinemaclone.firebaseapp.com",
            databaseURL: "https://jiocinemaclone-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "jiocinemaclone",
            storageBucket: "jiocinemaclone.appspot.com",
            messagingSenderId: "1067123666435",
            appId: "1:1067123666435:web:587e43ebeb833ccbb66836"
            };
        
        // Initialize Firebase
            this.app = initializeApp(this.firebaseConfig);
            this.dbRef = ref(getDatabase());
            
    }

    getdata = (name)=>{

        return new Promise((resolve,reject)=>{
            
        get(child(this.dbRef, `Availableshows/`+name+`/Name`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();  
                resolve(data);
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            reject(error);
          });

        });


    }
}

export {authentication,database}