// @desc spotify routes
// @routes /spotify

// require
const express = require('express');
const router = express.Router();

// init Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

// The API object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_CLIENT_ID,
  clientSecret : process.env.SPOTIFY_CLIENT_SECRET
});

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
});

router.get('/myendpoint', function (request, response) {
  // Search for a track!
  spotifyApi.searchTracks('track:Dancing Queen', {limit: 1})
    .then(function(data) {
      // Send the first (only) track object
      response.send(data.body.tracks.items[0]);
    }, function(err) {
      console.error(err);
    });
});
