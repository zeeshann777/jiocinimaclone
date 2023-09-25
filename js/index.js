
import { authentication } from "./networking.js";
import { database } from "./networking.js";

const nk = new authentication();
const db = new database();
const loginbtn = document.getElementById("loginbtn");

const url = window.location.href;

if(url.endsWith("login.html"))
{
    loginbtn.addEventListener("click",()=>{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        nk.login(email, password);
    });
    
    const signinbtn = document.getElementById("signinbtn");
    signinbtn.addEventListener("click",()=>{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        nk.signin(email,password);
    });
}

else{
    var names = ["Biggboss","match"];

    names.forEach(element => {
        db.getdata(element).then((resolve) => {
            var b = document.getElementById(element);
            b.innerHTML = resolve
        }).catch((reject) =>{
            console.log(reject);
        });
    });
}



