var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons")

var getUserRepos = function(user) { //make API call to get repo
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: GitHub User Not Found")
            }
        }) //no semi colon to chain onto line 8
        .catch(function(error) {
            alert("Error: Unable to Connect to GitHub")
        });
};

formSubmitHnadler = function(event) { //read form input
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

var displayRepos = function(repos, searchTerm) { //display repo on page
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        //create container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        //create span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        //append to container
        repoEl.appendChild(titleEl);
        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        //check if repo has issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append to container
        repoEl.appendChild(statusEl);
        //append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
};

var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data.items, language);
                });
            } else {
                alert("ErrorL GitHub User Not Found");
            }
        });
};

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language")
    if (language) {
        getFeaturedRepos(language)
        repoContainerEl.textContent = "";
    }
}

userFormEl.addEventListener("submit", formSubmitHnadler);
languageButtonsEl.addEventListener("click", buttonClickHandler);