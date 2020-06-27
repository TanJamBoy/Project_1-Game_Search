var gameName = "";
var numberOfGifs = "10";
var gifInfo = "";
var failedSearch = false;

//click event for more gifs button
$("#moreGifsBtn").click(moreGifs);

//Click event for search button
$("#searchBtn").click(gameSearch);

//Function that calls the apis using the search input value after clicking the search button
function gameSearch(){
    
    $("#gameInfo").empty();
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

        console.log(response);

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
                console.log(response);
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

    var newTitle = $("<h1>");
    var newDesc = $("<p>");
    var newDevs = $("<ul>");
    var newGenres = $("<ul>");
    var newMeta = $("<p>");
    var newPlats = $("<ul>");
    var newReleased = $("<p>");
    var newTags = $("<ul>");
    var newWebsite = $("<a>");

    newTitle.text("Title: " + title);
    newDesc.text("Description: " + desc);
    newMeta.text("Metacritic Score: " + meta);
    newReleased.text("Release Date: " + released);
    newWebsite.text(website);
    newWebsite.attr("href", website);
    newDevs.text("Developers: ");
    newGenres.text("Genres: ");
    newPlats.text("Platforms: ");
    newTags.text("Tags: ");
    for(i=0; i < devs.length; i++){
        var newDev = $("<li>");
        newDev.text(devs[i].name)
        newDevs.append(newDev);
    };
    for(i=0; i < genres.length; i++){
        var newGenre = $("<li>");
        newGenre.text(genres[i].name)
        newGenres.append(newGenre);
    };
    for(i=0; i < plats.length; i++){
        var newPlat = $("<li>");
        newPlat.text(plats[i].platform.name)
        newPlats.append(newPlat);
    };
    for(i=0; i < tags.length; i++){
        var newTag = $("<li>");
        newTag.text(tags[i].name)
        newTags.append(newTag);
    };


    $("#gameInfo").append(newTitle, newDesc, newDevs, newGenres, newMeta, newPlats, newReleased, newTags, newWebsite);
    $("#gameInfo").css("display" , "block");
};

//Function to add gifs to the page
function addGifs() {

    var newGif = $("<div>");

    for(i=0; i < +numberOfGifs-5; i++){
        var newGifImg = $("<img>")
        var gifUrl = gifInfo[i].images.fixed_height.url
        newGifImg.attr("src", gifUrl);
        newGif.append(newGifImg);
    };

    $("#gameGifs").prepend(newGif);
    $("#moreGifsBtn").css("display", "block");

};

//Function to add 5 more gifs to the page
function moreGifs(){

    var newGif = $("<div>");

    for(i=5; i < +numberOfGifs; i++){
        var newGifImg = $("<img>")
        var gifUrl = gifInfo[i].images.fixed_height.url
        newGifImg.attr("src", gifUrl);
        newGif.append(newGifImg);
    };

    $("#gameGifs").append(newGif);
    $("#moreGifsBtn").css("display", "none");

};