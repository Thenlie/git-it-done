// var getUserRepos = function() {
//     fetch("https://api.github.com/users/octocat/repos").then(function(repsonse) {
//         response.json().then(function(data) {
//             console.log(data);
//         });
//     });

// };

// getUserRepos();

var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos").then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
}

getUserRepos();