let inputText = document.querySelector("input[type=text]");
let submitBtn = document.querySelector("input[type=submit]");
let reposContent = document.querySelector(".repos-content");

submitBtn.addEventListener("click", () => {
  if (inputText.value.length < 1) {
  } else {
    reposContent.innerHTML = ""
    fetch(`https://api.github.com/users/${inputText.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.html_url)
        fetch(data.repos_url)
          .then((res) => res.json())
          .then((eachRepo) => {
            console.log(eachRepo);
            eachRepo.map((repo) => {
              let h3 = document.createElement("h3");
              h3.textContent = repo.name;
              let link = document.createElement("a");
              link.textContent = `Link`;
              link.target = "_blank";
              link.href = `https://${repo.owner.login}.github.io/${repo.name}`;
              let codeContent = document.createElement('a');
              codeContent.href = `${data.html_url}/${repo.name}` 
              codeContent.textContent = "Code"
              codeContent.target = "_blank"
              let eachRepoContainer = document.createElement("div");
              let infoContainer = document.createElement("div");
              let eachRepo = document.createElement("div");
              let projectStars = document.createElement("p");
              projectStars.textContent = `projectStars: ${repo.stargazers_count}`;
              eachRepo.appendChild(h3);
              infoContainer.appendChild(link);
              infoContainer.appendChild(projectStars);
              infoContainer.appendChild(codeContent)
              infoContainer.className = "info-container";
              infoContainer.style.cssText =
                "display:flex; justify-content:space-around; align-items:center";
              reposContent.appendChild(eachRepoContainer);
              eachRepoContainer.appendChild(eachRepo);
              eachRepoContainer.appendChild(infoContainer);
            });
          });
      });
    inputText.value = "";
  }
});
