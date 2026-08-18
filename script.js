let name = document.querySelector("#textbox");
let btn = document.querySelector("#searchBtn ");
let container = document.querySelector(".container")


const username = localStorage.getItem("Username") || "";



    const profile = document.querySelector("#profile");

function createProfile(user) {
    profile.innerHTML = "";

    // Profile card
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");

  
    const profileImg = document.createElement("img");
    profileImg.classList.add("profile-img");
    profileImg.src = user.avatar_url;
    profileImg.alt = `${user.login}'s profile picture`;

    
    const name = document.createElement("h2");
    name.classList.add("name");
    name.textContent = user.name || user.login;

    
    const username = document.createElement("p");
    username.classList.add("username");
    username.textContent = `@${user.login}`;

    // Bio
    const bio = document.createElement("p");
    bio.classList.add("bio");
    bio.textContent = user.bio || "No bio available";

    // Stats container
    const stats = document.createElement("div");
    stats.classList.add("stats");

    // Followers
    const followersStat = document.createElement("div");
    followersStat.classList.add("stat");

    const followersTitle = document.createElement("h3");
    followersTitle.textContent = "Followers";

    const followersValue = document.createElement("p");
    followersValue.classList.add("value");
    followersValue.textContent = user.followers;

    followersStat.append(followersTitle, followersValue);

    // Following
    const followingStat = document.createElement("div");
    followingStat.classList.add("stat");

    const followingTitle = document.createElement("h3");
    followingTitle.textContent = "Following";

    const followingValue = document.createElement("p");
    followingValue.classList.add("value");
    followingValue.textContent = user.following;

    followingStat.append(followingTitle, followingValue);

    // Repositories
    const reposStat = document.createElement("div");
    reposStat.classList.add("stat");

    const reposTitle = document.createElement("h3");
    reposTitle.textContent = "Repos";

    const reposValue = document.createElement("p");
    reposValue.classList.add("value");
    reposValue.textContent = user.public_repos;

    reposStat.append(reposTitle, reposValue);


    stats.append(
        followersStat,
        followingStat,
        reposStat
    );

   
    const githubLink = document.createElement("a");
    githubLink.id = "githubLink";
    githubLink.classList.add("github-btn");
    githubLink.target = "_blank";
    githubLink.href = user.html_url;
    githubLink.textContent = "View GitHub";


    profileCard.append(
        profileImg,
        name,
        username,
        bio,
        stats,
        githubLink
    );

    // Add card to profile
       profile.appendChild(profileCard);
}


btn.addEventListener("click", function (e) {
    e.preventDefault();
    const username = name.value;
    localStorage.setItem("Username", name.value);
    console.log(username)
    
    getUser();


})

async function getUser() {
    try {   
        const response = await fetch(`https://api.github.com/users/${username}`);

     

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: ${response.statusText}`
            );
        }
        const data = await response.json();
      createProfile(data);
        
    }
    catch (error) {
        console.log(error);
    }   
    finally {
        console.log("Fetched");
    }

}

