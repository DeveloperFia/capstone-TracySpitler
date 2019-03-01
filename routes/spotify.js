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

// audio features for a track - GET
router.get('/features/:id', function (req, res) {
  spotifyApi.getAudioFeaturesForTrack(req.params.id)
  .then(function(data) {
    // send json
    res.json({
      results: data.body
    });
  }, function(err) {
    done(err);
  });
});

// search spotify api - GET
router.get('/:search', function (req, res) {
  // Search for a track!
  spotifyApi.searchTracks('track:' + req.params.search, {limit: 3})
    .then(function(data) {
      // send json
      res.json({
        results: data.body.tracks.items
      });
    }, function(err) {
      console.error(err);
    });
});

// set up router
module.exports = router;
