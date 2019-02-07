// include
const express = require('express');
const router = express.Router()
const passportSpotify = require('../auth/spotify');
const protect = require('connect-ensure-login').ensureLoggedIn;
var request = require("request");

// spotify authentication
router.get('/spotify', passportSpotify.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-recently-played'],
  showDialog: true
}));

// spotify callback
router.get('/spotify/callback', passportSpotify.authenticate('spotify', {failureRedirect: '/login'}), (req, res, next) => {
  // successful auth - redirect to profile
  res.redirect('/profile');
});

// set up router
module.exports = router;
