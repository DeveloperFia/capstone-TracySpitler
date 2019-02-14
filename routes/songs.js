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
  List.find({ user: req.user._id }, function(err, lists) {
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
  Song.find({user: req.user._id}, function(err, songs) {
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
router.get('/', protect, getSongs, getLists, (req, res) => {
  res.render('songs', {
    msg:'All of the users songs will be here.',
    songs: req.songs,
    lists: req.lists
  });
});

// new song - GET
router.get('/new', protect, (req, res) => {
    res.send("Search or fill out form to add a song to a list.");
});

// add song to a list - POST
router.post('/create', protect, (req, res) => {
  // check for empty values
  req.checkBody('songtitle', 'Please give the song a title.').notEmpty();
  req.checkBody('artist', 'Please give the song an artist.').notEmpty();

  // if there are errors..
  var err = req.validationErrors();
  if (err){
    // send errors
    res.send({err});
  }
  // otherwise save the song to the db
  else {
    var newSong = Song({
      title: req.body.songtitle,
      artist: req.body.artist,
      capo: req.body.capo,
      tempo: req.body.bpm,
      duration: req.body.duration,
      key: req.body.key,
      lists: [],
      user: req.user._id,
    });

    //save the song
    newSong.save(function(err) {
      if (err){
        // send errors
        res.send({err});
      }
    });

    // if a list was selected..
    if (req.body.listchoice) {
      // make sure it's an array
      var listchoice = Array.isArray(req.body.listchoice) ? req.body.listchoice : [req.body.listchoice];
      // for each selected list
      for (var i = 0; i < listchoice.length; i++) {
        // find it in the database
        List.findOne({name: listchoice[i]}, function(err, list) {
          if (err){
            // send errors
            res.send({err});
          }
          // push the song id into the list
          list.songs.push(newSong._id);
          // save the list
          list.save(function(err) {
            if (err){
              // send errors
              res.send({err});
            }
          });
          // find song to update the lists
          Song.findOne({_id: newSong._id}, function(err, song) {
            // push the list id into the song's lists
            song.lists.push(list._id);
            // save the song
            song.save(function(err) {
              if (err){
                // send errors
                res.send({err});
              }
            });
          });
        });
      }
    }

    // if custom list has a value..
    if (req.body.newlist) {
      // check for empty values
      req.checkBody('newlist', 'Please give the list a name.').notEmpty();

      // if there are errors..
      var err = req.validationErrors();
      if (err){
        // send errors
        res.send({err});
      }
      // otherwise save the list to the db
      else {
        // create a custom list object
        var customList = List({
          name: req.body.newlist,
          user: req.user._id
        });

        // push the song id into the list
        customList.songs.push(newSong._id);

        // save list to the database
        customList.save(function(err) {
          if (err){
            // send errors
            res.send({err});
          }
          else {
            // find song to update the lists
            Song.findOne({_id: newSong._id}, function(err, song) {
              // push the list id into the song's lists
              song.lists.push(customList._id);
              //save the song
              song.save(function(err) {
                if (err){
                  // send errors
                  res.send({err});
                }
              });
            });
          }
        });
      }
    }
    // go back to the song page
    return res.redirect('/song');
  }
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
  // find the list by {id}
  Song.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      // send errors
      res.send({err});
    }
  });

  // render songs
  res.render('songs', {
    msg:'All of the users songs will be here.',
    songs: req.songs,
    lists: req.lists
  });
});

// set up router
module.exports = router;
