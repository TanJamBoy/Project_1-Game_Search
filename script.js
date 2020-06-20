var gameName = "";
var numberOfGifs = "10";
var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + gameName + "&api_key=0eO0W4UGwnjIshNo3zpS7U4C56NEqw0b&limit=" + numberOfGifs;
var RAWGUrl = "https://api.rawg.io/api/games";

$.ajax({
    url: giphyUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
});

$.ajax({
    url: RAWGUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
});