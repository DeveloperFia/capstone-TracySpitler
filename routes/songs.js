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

// function to convert milliseconds to time
function toTime(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return {
    minute: minutes,
    seconds: (seconds < 10 ? '0' : '') + seconds
  }
}

// function to convert time to milliseconds
function toMilliseconds(hours, min, sec) {
  return hours * 3600000 + min * 60000 + sec * 1000;
}

// all songs - GET
router.get('/', protect, getSongs, getLists, (req, res) => {
  res.render('library', {
    msg:'All of the users songs will be here.',
    songs: req.songs,
    lists: req.lists,
    getDuration: function(ms) {
      var timeObj = toTime(ms);
      var time = timeObj.minute + ':' + timeObj.seconds;
      return time;
    }
  });
});

// create a song - POST
router.post('/create', protect, (req, res) => {
  // check for empty values
  req.checkBody('songtitle', 'Please give the song a title.').notEmpty();
  req.checkBody('artist', 'Please give the song an artist.').notEmpty();

  // convert duration to ms
  var duration = req.body.duration.split(":");
  if (duration.length != 3) {
    duration.unshift(0);
  }
  var ms = toMilliseconds(duration[0], duration[1], duration[2]);

  // if there are errors..
  var err = req.validationErrors();
  if (err){
    // send errors
    console.log(err);
  }
  // otherwise create a song object
  else {
    var newSong = Song({
      title: req.body.songtitle,
      artist: req.body.artist,
      capo: req.body.capo,
      tempo: req.body.bpm,
      duration: ms,
      key: req.body.key,
      lists: [],
      user: req.user._id,
      img: req.body.img,
      spotify_id: req.body.spotify_id,
      preview_url: req.body.preview_url
    });

    //save the song
    newSong.save(function(err) {
      if (err){
        // send errors
        console.log(err);
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
              console.log(err);
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
                console.log(err);
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
router.get('/get/:id', protect, getSongs, getLists, (req, res) => {
  // get the list by the params id
  Song.find({ _id: req.params.id }, function(err, song) {
    if (err) {
      // send errors
      res.send({err});
    }
    // find lists this song belongs to
    List.find({songs: req.params.id }, function(err, lists) {
      if (err) {
        // send errors
        res.send({err});
      }
      else {
        // find lists not in
        var therest = [];
        lists.forEach(function(x) {
          for (var i = 0; i < req.lists.length; i++) {
            if (req.lists[i]._id.toString() != x._id.toString()) {
              therest.push(req.lists[i]);
            }
          }
        });

        // redirect
        res.render('song', {
          song: song[0],
          old: lists,
          therest: therest,
          allLists: req.lists,
          duration: toTime(song[0].duration)
        });
      }
    });
  });
});

// update song - POST
router.post('/update/:id', protect, getSongs, getLists, (req, res) => {
  // find the list by {id}
  Song.findById(req.params.id, function(err, song) {
    if (err) {
      // send errors
      res.send({err});
    }

    // update the song
    song.title = req.body.songtitle;
    song.artist = req.body.artist;
    song.key = (req.body.key == 'none') ? -1 : req.body.key;
    song.tempo = req.body.bpm;
    song.capo = req.body.capo;
    song.duration = req.body.duration;
    //song.lists = [];
    user: req.user._id;

    // check old lists
    if (req.body.oldlist) {
      // update for removed list
    }
    else {
      song.lists = [];
      List.updateMany({songs: song._id }, {$pull: { songs: song._id }},
      { multi: true }, function(err, list) {
        if (err) {
          // send errors
          res.send({err});
        }
      });
    }

    // check selected lists
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
          list.songs.push(song._id);
          // save the list
          list.save(function(err) {
            if (err){
              // send errors
              res.send({err});
            }
          });
          // find song to update the lists
          Song.findOne({_id: song._id}, function(err, song) {
            // push the list id into the song's lists
            song.lists.push(list._id);
            // save the song
            song.save(function(err) {
              if (err){
                // send errors
                console.log(err);
              }
            });
          });
        });
      }
    }

    // check created list
    if (req.body.newlist) {
      // create a custom list object
      var newlist = List({
        name: req.body.newlist,
        user: req.user._id
      });
      // push song to list and list to song
      newlist.songs.push(song._id);
      song.lists.push(newlist._id);
      // save the list
      newlist.save(function(err) {
        if (err){
          // send errors
          res.send({err});
        }
      });
    }

    // save the song
    song.save(function(err) {
      if (err) {
        // send errors
        console.log(err);
      }
    });
  });
  // redirect
  res.redirect('/song/get/' + req.params.id);
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

  List.updateMany({songs: req.params.id }, {$pull: { songs: req.params.id }},
  { multi: true }, function(err, list) {
    if (err) {
      // send errors
      res.send({err});
    }
  });
  // render songs
  res.render('library', {
    msg:'All of the users songs will be here.',
    songs: req.songs,
    lists: req.lists
  });
});

// set up router
module.exports = router;
