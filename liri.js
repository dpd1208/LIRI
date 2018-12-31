// dotenv package import
require('dotenv').config()

// keys.js import
var keys = require('./keys.js');

// spotify package import
var Spotify = require('node-spotify-api');

//moment import
var moment = require('moment');

//fs
var fs = require('fs');

// axios import
var axios = require("axios");

var action = process.argv[2];
var search = process.argv[3];

switch (action) {
  case "concert-this":
  concert(search);
    break;

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
function concert(search) {
var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
axios.get(queryUrl).then(
function(response) {
  if (!search) {
    console.log("Enter a band or artist name.");
  } else {
    console.log("Name of venue: " + response.data[0].venue.name);
    console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
    console.log("Event Date: " + response.data[0].datetime);
  }
})
};

// HOW TO USE SPOTIFY

function spotify(search) {

  var spotify = new Spotify(keys.spotify);
  if (!search) {
    search = 'The Sign';
  }
  spotify.search({
    type: 'track',
    query: search
  }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    } else {
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
  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
function(response) {
    if (!search) {
      search = 'Mr Nobody';
    } else {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  })
};

function whatSays() {
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}
		var dataArr = data.split(",");

		// Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
    if (dataArr[0] === "concert-this") {
			var concertEvent = dataArr[1].slice(1, -1);
      concert(concertEvent);
    } else if (dataArr[0] === "spotify-this-song") {
			var song = dataArr[1].slice(1, -1);
			spotify(song);
		} else if(dataArr[0] === "movie-this") {
			var movieName = dataArr[1].slice(1, -1);
			movie(movieName);
		} 
		
  	});

};
