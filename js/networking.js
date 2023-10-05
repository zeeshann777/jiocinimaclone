
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref as dbref, child, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

import { getStorage, ref as sref, listAll, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

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
            this.dbRef = dbref(getDatabase());
            
    }

    getdata = ()=>{

        return new Promise((resolve,reject)=>{
            
        get(child(this.dbRef, `/`)).then((snapshot) => {
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
    getstoreage = () =>{
        return new Promise((resolve,reject) => {
        const storage = getStorage(this.app);
        const imagesRef = sref(storage, 'test');
        // Find all the prefixes and items.
    listAll(imagesRef)
    .then((res) => {
    res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef.fullPath)
        getDownloadURL(sref(storage, itemRef.fullPath))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    resolve(url)
  })
  .catch((error) => {
    // Handle any errors
  });
    });
    }).catch((error) => {
    // Uh-oh, an error occurred!
    });

    }
)}
}

export {authentication,database}