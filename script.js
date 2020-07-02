var gameName = "";
var numberOfGifs = "10";
var gifInfo = "";
var failedSearch = false;

//click event for more gifs button
$("#moreGifsBtn").click(moreGifs);

//Click event for search button
$("#searchBtn").click(gameSearch);

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        gameSearch();
    };
});

//Function that calls the apis using the search input value after clicking the search button
function gameSearch(){

    if (event){
        event.preventDefault();
    }else{

    };
    
    
    $("#gameGifs").empty();
    $("#moreGifsBtn").css("display", "none");

    gameName = $("#searchInput").val();
    var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + gameName + "&api_key=0eO0W4UGwnjIshNo3zpS7U4C56NEqw0b&limit=" + numberOfGifs + "&rating=g";
    if (failedSearch){

    }else{
        RAWGGameName = gameName.replace(/ /g, "-");
    };
    var RAWGUrl = "https://api.rawg.io/api/games/" + RAWGGameName;
    

    $.ajax({
        url: RAWGUrl,
        method: "GET"
    }).then(function(response){

        if (response.redirect){

            RAWGGameName = response.slug;
            failedSearch = true;
            gameSearch();

        }else{

            failedSearch = false;
            addInfo(response);
            $.ajax({
                url: giphyUrl,
                method: "GET"
            }).then(function(response){
                gifInfo = response.data;
                addGifs();
            });

        };
        
    });

};

//Function to add game information to the page
function addInfo(response){

    var title = response.name;
    var desc = response.description_raw;
    var devs = response.developers;
    var genres = response.genres;
    var meta = response.metacritic;
    var plats = response.platforms;
    var released = response.released;
    var tags = response.tags;
    var website = response.website;
    var backgroundImage = response.background_image;

    $(".background").css("background-image", "url(" + backgroundImage + ")");

    if(meta > 74) {
        $(".metacriticColor").css("background-color", "#6c3")
    }else if(meta > 49) {
        $(".metacriticColor").css("background-color", "#fc3")
    }else{
        $(".metacriticColor").css("background-color", "#f00")
    };

    var newTitle = $("#game-title");
    var newDesc = $("#game-description");
    var newDevs = $("#game-developers");
    var newGenres = $("#genres");
    var newMeta = $(".metacriticColor");
    var newPlats = $("#platforms");
    var newReleased = $("#release-date");
    var newTags = $("#tags");
    var newWebsite = $("#game-website");

    newTitle.text(title);
    newDesc.text(desc);
    newMeta.text(meta);
    newReleased.text("Release Date : " + released);
    newWebsite.text(website);
    newWebsite.attr("href", website);

    newDevs.empty();
    newGenres.empty();
    newPlats.empty();
    newTags.empty();

    for(i=0; i < devs.length; i++){
        var newDev = $("<div>");
        newDev.attr("class", "listItem");
        newDev.text(devs[i].name)
        newDevs.append(newDev);
    };
    for(i=0; i < genres.length; i++){
        var newGenre = $("<div>");
        newGenre.attr("class", "listItem");
        newGenre.text(genres[i].name)
        newGenres.append(newGenre);
    };
    for(i=0; i < plats.length; i++){
        var newPlat = $("<div>");
        newPlat.attr("class", "listItem");
        newPlat.text(plats[i].platform.name)
        newPlats.append(newPlat);
    };
    for(i=0; i < tags.length; i++){
        var newTag = $("<div>");
        newTag.attr("class", "listItem");
        newTag.text(tags[i].name)
        newTags.append(newTag);
    };

    $("#gameInfo").css("display" , "block");

};

//Function to add gifs to the page
function addGifs() {

    var newGif = $("<div>");

    for(i=0; i < +numberOfGifs-5; i++){
        var newGifImg = $("<img>")
        var gifUrl = gifInfo[i].images.fixed_width.url
        newGifImg.attr("src", gifUrl);
        newGif.append(newGifImg);
    };

    $("#gameGifs").prepend(newGif);
    newGif.attr("class", "gifDiv");
    $("#gameGifs").css("display" , "block");
    $("#moreGifsBtn").css("display", "block");

};

//Function to add 5 more gifs to the page
function moreGifs(){

    var newGif = $("<div>");

    for(i=5; i < +numberOfGifs; i++){
        var newGifImg = $("<img>")
        var gifUrl = gifInfo[i].images.fixed_width.url
        newGifImg.attr("src", gifUrl);
        newGif.append(newGifImg);
    };

    $("#gameGifs").append(newGif);
    newGif.attr("class", "gifDiv");
    $("#moreGifsBtn").css("display", "none");

};