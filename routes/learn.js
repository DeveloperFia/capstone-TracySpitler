// @desc practice routes
// @routes /auth

// require
const express = require('express');
const router = express.Router();
const protect = require('connect-ensure-login').ensureLoggedIn('/');

// learning dashboard
router.get('/', protect, (req, res) => {
    res.send("This is the dashboard for the learning section.");
});

// timed practice
router.get('/time', protect, (req, res) => {
    res.send("Practice for {set} time.");
});

// chords
router.get('/chords', protect, (req, res) => {
    res.send("Learn chords.");
});

// challenge
router.get('/challenge', protect, (req, res) => {
    res.send("Daily challenge.");
});

// practice recent
router.get('/recent', protect, (req, res) => {
    res.send("Practice recently added songs.");
});

// set up router
module.exports = router;
