// @desc song routes
// @routes /song

// require
const express = require('express');
const router = express.Router();
var path = require('path');
const protect = require('connect-ensure-login').ensureLoggedIn('/');

// models
const List = require('../models/list');
const Song = require('../models/song');

// function - get all lists from db
let getLists = (req, res, next) => {
  List.find({}, function(err, lists) {
    if (err) {
      // send errors
      res.send({err});
    }
    else {
      // add lists to req
      req.lists = lists;
      // run the next function
      next();
    }
  });
}

// function - gets all songs from db
let getSongs = (req, res, next) => {
  // get all the songs
  Song.find({}, function(err, songs) {
    if (err) {
      // send errors
      res.send({err});
    }
    else {
      // add songs to req
      req.songs = songs;
      // run the next function
      next();
    }
  });
}

// all songs - GET
router.get('/', protect, getSongs, (req, res) => {
  res.render('songs', {
    msg:'All of the users songs will be here.',
    songs: req.songs,
  });
});

// new song - GET
router.get('/new', protect, (req, res) => {
    res.send("Search or fill out form to add a song to a list.");
});

// add song to a list - POST
router.post('/create', protect, (req, res) => {
    res.send("Added song to a list.");
});

// specific song - GET
router.get('/get/:id', protect, (req, res) => {
    res.send("Get a specific song {by id}.");
});

// update song - PUT
router.put('/update/:id', protect, (req, res) => {
    res.send("Update a song {by id}.");
});

// delete song from list - DELETE
router.delete('/delete/:id', protect, (req, res) => {
    res.send("Delete a song from list {by id}.");
});

// set up router
module.exports = router;
