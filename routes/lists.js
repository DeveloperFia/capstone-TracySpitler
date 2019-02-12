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
    // create a new list object
    var newList = List({
      name: req.body.listname,
      difficulty: req.body.listdifficulty,
    });

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
        console.log('List successfully updated!');
      });
    });
    // redirect
    res.redirect('/list/' + req.params.id);
});

// delete list - DELETE
router.delete('/:id', protect, getLists, (req, res) => {
  console.log("deleting");
  // find the list by {id}
  List.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      // send errors
      console.log(err);
      res.send({err});
    }
    // the list has been deleted
    console.log('List deleted!');
  });

  // render lists
  res.render('setlists', {
    msg:'All of the users lists will be here.',
    lists: req.lists,
  });
});

// set up router
module.exports = router;
