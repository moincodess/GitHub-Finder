let name = document.querySelector("#textbox");
let btn = document.querySelector("#searchBtn ")


const username = localStorage.getItem("Username") || "";


function renderui(){

}

btn.addEventListener("click", function (e) {
    e.preventDefault();
    const username = name.value;
    localStorage.setItem("Username", name.value);
    console.log(username)
    
    getUser(username);
})

async function getUser(username) {
    try {   
        const response = await fetch(`https://api.github.com/users/${username}`);

     

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: ${response.statusText}`
            );
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }   
    finally {
        console.log("Fetched");
    }

}

