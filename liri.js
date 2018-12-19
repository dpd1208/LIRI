require("dotenv").config();

// axios import
var axios = require("axios");

axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);

// keys.js import
var keys = require("keys.js");

// EXAMPLE OF KEYS.JS
//var spotify = new Spotify(keys.spotify); 

//var Spotify = require('node-spotify-api');

// HOW TO USE SPOTIFT
//var spotify = new Spotify({
  //id: <your spotify client id>,
  //secret: <your spotify client secret>
//});
 
//spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//  if (err) {
   // return console.log('Error occurred: ' + err);
 // }
 
//console.log(data); 
//});