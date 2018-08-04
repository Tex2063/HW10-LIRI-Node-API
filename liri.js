require("dotenv").config();
var request = require("request");

// Add the code required to import the `keys.js` file and store it in a variable. HOW DO???

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

/* Make it so liri.js can take in one of the following commands:

* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says` 
HOW DO?! */

// IF ELSE STATEMENT FOR THE COMMANDS

if (command == "moviethis") {
    moviethis();
}

request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }

function mytweets() {
    // THIS WILL SHOW LAST 20 TWEETS.
}

function spotifythissong(songName) {
    /*    
        * This will show the following information about the song in your terminal/bash window
        
        * Artist(s)
        
        * The song's name
        
        * A preview link of the song from Spotify     
        * The album that the song is from
    */

}

function moviethis {
    /*        
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
    */
}

function dowhatitsays {
    /*    
        * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        
        * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        
        * Feel free to change the text in that document to test out the feature for other commands.
    */
}

});
