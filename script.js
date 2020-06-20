var gameName = "";
var numberOfGifs = "10";
var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + gameName + "&api_key=0eO0W4UGwnjIshNo3zpS7U4C56NEqw0b&limit=" + numberOfGifs;
var IGDBUrl = "https://api-v3.igdb.com/games";

$.ajax({
    url: giphyUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
});

var settings = {
    "url": "https://api-v3.igdb.com/games/?fields=name",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "user-key": "b2f7b6aa6761e0416dfd1ff05ebe5eac",
      "Cookie": "__cfduid=de7837968f96d696dda1a79b45ebf7ea41592682349"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });