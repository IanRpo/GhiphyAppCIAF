function getUserInput() {
    var inputValue = document.querySelector(".input").value;
    return inputValue;
}

document.querySelector(".Switch-Theme").addEventListener('click', ()=> {
    var body = document.querySelector('body');
    body.classList.toggle("dark");
});

document.querySelector(".searchBtn").addEventListener("click", function (e) {
    e.preventDefault();
    var userInput = getUserInput();
    searchGiphy(userInput);
});

document.querySelector(".input").addEventListener("keyup", function (e) {
    if (e.which === 13) {
        var userInput = getUserInput();
        searchGiphy(userInput);
    }
});

function searchGiphy(searchQuery) {
    var url = "https://api.giphy.com/v1/gifs/search?api_key=x5KKTi2QtklbXfP2KvhDY38g7CqtaX5A&q=" + searchQuery;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            pushToDOM(data);
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function pushToDOM(response) {
    var images = response.data;
    var container = document.querySelector(".gif-results");
    container.innerHTML = "";

    images.forEach(function (image) {
        var src = image.images.fixed_height.url;
        container.innerHTML += "<div class='card'><a href='" + src + "'><img src='" + src + "' class='gif gif__image' /></a></div>";
    });
}
