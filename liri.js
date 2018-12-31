// dotenv package import
require('dotenv').config()

// keys.js import
var keys = require('./keys.js');

// spotify package import
var Spotify = require('node-spotify-api');

var request = require('request');

//moment import
var moment = require('moment');

// axios import
var axios = require("axios");

var action = process.argv[2];
var search =process.argv[3];

switch(action) {
	case "spotify-this-song":
	spotify(search);
	break;

	case "movie-this":
	movie(search);
	break;

	case "do-what-it-says":
	whatSays();
	break;
};

// HOW TO USE SPOTIFY

  function spotify(search) {

    var spotify = new Spotify(keys.spotify);
      if (!search){
            search = 'The Sign';
        }
      spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err){
                console.log('Error occurred: ' + err);
                return;
            }
            else {
            var songInfo = data.tracks.items;
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
            }
    });
  }
  
  //Movie search function 
  function movie(search) {
  
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";
  
    request(queryUrl, function(error, response, body) {
      if (!search){
            search = 'Mr Nobody';
        }
      else {
  
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
  };
  

  
