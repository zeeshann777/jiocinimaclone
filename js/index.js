
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
    db.getdata().then((resolve) => {
                const shows = resolve;
                // document.getElementById("Top_reated").innerHTML = resolve["Availableshows"]["Top_reated"]["Biggboss"]["Name"]
                var names = Object.keys(resolve["Availableshows"]);
                console.log(resolve)
                names.forEach(element => {
                    if(element == "Top_reated")
                    {
                        var shows = Object.keys(resolve["Availableshows"][element])
                        console.log(shows)  
                        document.getElementById(element).innerHTML = resolve["Availableshows"][element][shows[0]]["Name"]
                    }
                })
            }).catch((reject) =>{
                console.log(reject);
            });
    // names.forEach(element => {
    //     db.getdata(element).then((resolve) => {
    //         var b = document.getElementById(element);
    //         b.innerHTML = resolve
    //     }).catch((reject) =>{
    //         console.log(reject);
    //     });
    // });
}



