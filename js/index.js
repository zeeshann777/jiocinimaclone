
import { authentication } from "./networking.js";
import { database } from "./networking.js";

const nk = new authentication();
const db = new database();
const loginbtn = document.getElementById("loginbtn");
// loginbtn.addEventListener("click",()=>{
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     nk.login(email, password);
// });

// const signinbtn = document.getElementById("signinbtn");
// signinbtn.addEventListener("click",()=>{
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     nk.signin(email,password);
// });

db.getdata().then((resolve) => {
    var b = document.getElementById("big");
    b.innerHTML = resolve
}).catch((reject) =>{
    console.log(reject);
});
