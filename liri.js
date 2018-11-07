require("dotenv").config();
var tKeys = require('./keys.js');
var twitterPackage = require('twitter');
var spotifyAPI = require('node-spotify-api');
var sKeys = require('./keys.js');
var request = require('request');
var fs = require('fs');
var oKeys = require('./keys.js');


var userCommand = process.argv[2];
var userInput = process.argv[3];

switch (userCommand) {
    case 'my-tweets':
        myTweets();
        break;

    case 'spotify-this-song':
        var songName = userInput;
        spotifyThis(songName);
        break;

    case 'movie-this':
        movieName = userInput;
        movieThis(movieName);
        break;

    case 'do-what-it-says':
        doIt();
        break;

    default:
        console.log("Enter an approved command")
};


function myTweets() {
    var client = new twitterPackage({
        consumer_key: tKeys.twitterKeys.consumer_key,
        consumer_secret: tKeys.twitterKeys.consumer_secret,
        access_token_key: tKeys.twitterKeys.access_token_key,
        access_token_secret: tKeys.twitterKeys.access_token_secret
    });
    var parameters = { screen_name: 'boot_hw', count: '20' };

    client.get('statuses/user_timeline', parameters, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i].text;
                var tweetTime = tweets[i].created_at;
                console.log('boot_hw tweeted "' + tweet + '" at ' + tweetTime);
            }
        } else {
            console.log("Error: " + error);
        }
    });
}

function spotifyThis(songName) {
    var spotify = new spotifyAPI({
        id: sKeys.spotifyKeys.client_id,
        secret: sKeys.spotifyKeys.client_secret
    });
    if (songName == null) {
        songName = 'The Sign Ace of Base';
    }
    var parameters = songName;
    spotify.search({ type: 'track', query: parameters }, function (error, data) {
        if (!error && songName != null) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var artists = data.tracks.items[i].artists[0].name;
                var name = data.tracks.items[i].name;
                var preview = data.tracks.items[i].preview_url;
                var album = data.tracks.items[i].album.name;
                console.log('=================================');
                console.log('Artists: ' + artists);
                console.log('Song Name: ' + name);
                console.log('Preview URL: ' + preview);
                console.log('Album Name: ' + album);
                console.log('=================================');
            }
        } else {
            console.log("Error: " + error);
        }
    })
}

function movieThis(movieName) {
    var omdbKey = oKeys.omdbKey.api_key
    if (movieName == null) {
        movieName = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKey, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('===========================================');
            console.log("Title: " + JSON.parse(body).Title);
            console.log("The move came out in " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("County the movie was produced in: " + JSON.parse(body).Country);
            console.log("Movie Language: " + JSON.parse(body).Language);
            console.log("Plot Synopsis: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log('===========================================');
        } else {
            console.log("Error: " + error);
        }
        
        if(movieName === "Mr. Nobody"){
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
          }
    });
}


function doIt() {

    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log("Error: " + error);
        } else {
            var stuffToDo = data.split(",");
            userCommand = stuffToDo[0];
            userInput = stuffToDo[1];

            switch (userCommand) {
                case 'my-tweets':
                    myTweets();
                    break;

                case 'spotify-this-song':
                    var songName = userInput;
                    spotifyThis(songName);
                    break;

                case 'movie-this':
                    movieName = userInput;
                    movieThis(movieName);
                    break;

                case 'do-what-it-says':
                    doIt();
                    break;

                default:
                    console.log("Enter an approved command")
            }
        }
    })
}