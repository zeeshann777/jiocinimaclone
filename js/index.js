
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
    // this is show availabe shows top rated 
    
    var one = document.getElementById("img1").children;
    // image
    console.log(one[0].children[0].children[1]);
    //text
    console.log(one[0].children[0].children[0].children[0].children[1])
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
                        for (let index = 0; index < 2; index++) {
                            
                            one[index].children[0].children[0].children[0].children[0].innerHTML = resolve["Availableshows"][element][shows[index]]["Name"]    
                        } 
                        
                    }
                })
            }).catch((reject) =>{
                console.log(reject);
            });

        { 
        var clickcout = 0;
        document.getElementById("rightbtn").addEventListener("click", () => {
            
            one[clickcout + 1].style.visibility = "visible";
            one[clickcout].style.visibility = "hidden";
            clickcout +=1;
        })
        } 
    
        { 
            document.getElementById("leftbtn").addEventListener("click", () => {
                
                console.log(clickcout)
                one[clickcout].style.visibility = "hidden";
                one[clickcout-1].style.visibility = "visible";
                clickcout -=1;
        })
        } 
    //this is for big boss image
    db.getStorage("test").then((result)=>{
        const img = document.getElementById("testimg");
        img.setAttribute('src',result);
    }).catch(e=>{

    });
    
    // this is for biggest reality shows
    db.getStorage("biggest_reality_shows").then((result) => {
        const reality_shows = document.getElementById("biggest_reality_shows").children;
        for(var i = 0; i<reality_shows.length; i++)
        {
            reality_shows[i].src = result[i];
        }
    });
    
    // this is for top hollywood movies
    db.getStorage("Top_Hollywood_Movies").then((result) => {
        const hollywood_movies = document.getElementById("Top_Hollywood_Movies").children;
        for(var i = 0; i<hollywood_movies.length; i++)
        {
            hollywood_movies[i].src = result[i];
        }
    });
}

    

