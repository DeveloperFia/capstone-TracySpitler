// @desc list routes
// @routes /list

// require
const express = require('express');
const router = express.Router();
var path = require('path');
const protect = require('connect-ensure-login').ensureLoggedIn('/');

// models
const List = require('../models/list');
const Song = require('../models/song');
const User = require('../models/user');

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

// function to convert milliseconds to time
function toTime(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return {
    minute: minutes,
    seconds: (seconds < 10 ? '0' : '') + seconds
  }
}

// all lists - GET
router.get('/', protect, getLists, (req, res) => {
  res.render('setlists', {
    msg:'All of the users lists will be here.',
    lists: req.lists,
  });
});

// create list - POST
router.post('/create', protect, (req, res) => {
  // validate
  req.checkBody('listname', 'Please name the list.').notEmpty();

  // if errors
  var err = req.validationErrors();
  if (err){
    // send errors
    res.send({err});
  }
  else {
    User.findOne({ _id: req.user._id }, function(err, user) {
      // create a new list object
      var newList = List({
        name: req.body.listname,
        difficulty: req.body.listdifficulty,
        user: user._id
      });
      // push the list to user
      user.lists.push(newList._id);
      // save the user
      user.save(function(err) {
        if (err) {
          // send errors
          res.send({err});
        }
        else {
          // save the list
          newList.save(function(err) {
            if (err) {
              // send errors
              res.send({err});
            }
            else {
              // redirect
              res.redirect('/list');
            }
          });
        }
      });
    });
  }
});

// specific list - GET
router.get('/:id', protect, getLists, getSongs, (req, res) => {
    // get the list by the params id
    List.find({ _id: req.params.id }, function(err, list) {
      if (err) {
        // send errors
        res.send({err});
      }
      // find songs in this list
      Song.find({lists: req.params.id }, function(err, songs) {
        if (err) {
          // send errors
          res.send({err});
        }
        else {
          // redirect
          res.render('list', {
            list: list[0],
            lists: req.lists,
            songs: songs,
            getDuration: function(ms) {
              var timeObj = toTime(ms);
              var time = timeObj.minute + ':' + timeObj.seconds;
              return time;
            }
          });
        }
      });
    });
});

// update list - POST
router.post('/update/:id', protect, (req, res) => {
    // find the list by {id}
    List.findById(req.params.id, function(err, list) {
      if (err) {
        // send errors
        res.send({err});
      }
      // update the list
      list.name = req.body.listname;
      // if the difficulty was changed
      if (req.body.listdifficulty >= 0) {
          list.difficulty = req.body.listdifficulty;
      }
      else {
          list.difficulty = list.difficulty;
      }

      // save the list
      list.save(function(err) {
        if (err) {
          // send errors
          res.send({err});
        }
      });
    });
    // redirect
    res.redirect('/list/' + req.params.id);
});

// delete list - DELETE
router.delete('/:id', protect, getLists, (req, res) => {
  // find the list by {id}
  List.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      // send errors
      res.send({err});
    }
  });

  Song.updateMany({lists: req.params.id }, {$pull: { lists: req.params.id }},
  { multi: true }, function(err, song) {
    if (err) {
      // send errors
      res.send({err});
    }
  });

  // render lists
  res.render('setlists', {
    msg:'All of the users lists will be here.',
    lists: req.lists,
  });
});

// set up router
module.exports = router;
