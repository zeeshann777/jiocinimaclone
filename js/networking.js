
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref as dbref, child, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

import { getStorage, ref as sref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

class authentication {
    constructor() {

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
                window.location.href = "http://127.0.0.1:5500/jc.html";
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/network-request-failed") {
                    alert("check your network connection");
                }
                else {
                    alert("check your email and password")
                }
            });
    }

    signin = (email, password) => {
        createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("login successfull");
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/network-request-failed") {
                alert("check your network connection")
            }
            else {
                alert("check your email and password")
            }
            // ..
        });
    }
}

class database {
    constructor() {
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

    getdata = () => {

        return new Promise((resolve, reject) => {

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
    getStorage = (path) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(this.app);
            const imagesRef = sref(storage, path);
            const imgurl = [];
    
            listAll(imagesRef)
                .then((res) => {
                    const downloadPromises = res.items.map((itemRef) => {
                        return getDownloadURL(sref(storage, itemRef.fullPath))
                            .then((url) => {
                                imgurl.push(url);
                            })
                            .catch((error) => {
                                // Handle any errors
                                console.error('Error getting download URL:', error);
                            });
                    });
    
                    // Use Promise.all to wait for all download promises to resolve
                    Promise.all(downloadPromises)
                        .then(() => {
                            resolve(imgurl);
                        })
                        .catch((error) => {
                            // Handle any errors from download promises
                            console.error('Error fetching download URLs:', error);
                            reject(error);
                        });
                })
                .catch((error) => {
                    // Handle any errors from listAll
                    console.error('Error listing items:', error);
                    reject(error);
                });
        });
    };
    
}

export { authentication, database }