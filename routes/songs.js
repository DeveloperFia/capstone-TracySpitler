// include
const express = require('express');
const router = express.Router()
const path = require('path');

// models
const List = require('../models/List');
const Song = require('../models/Song');

// function that gets all of the lists from the database
let getLists = (req, res, next) => {
    // get all the lists
    List.find({}, function(err, lists) {
        // if there is an error, throw it
        if (err)
            console.log('err', err);
        // add a list of lists to the request object to be used in different routes
        req.lists = lists;
        // run the next function
        next()
    });
}

// function that gets all of the songs from the database
let getSongs = (req, res, next) => {
    // get all the songs
    Song.find({}, function(err, songs) {
        // if there is an error, throw it
        if (err)
            console.log('err', err);
        // add a list of songs to the request object to be used in different routes
        req.songs = songs;
        // run the next function
        next()
    });
}

// POST ** route to save a new song - a POST request to /songs
router.post('/songs', getLists, getSongs, (req, res, next) => {

    // check for empty values
    req.checkBody('title', 'Please give the song a title.').notEmpty();
    req.checkBody('artist', 'Please give the song an artist.').notEmpty();

    // if there are errors..
    var errors = req.validationErrors();
    if (errors){
        // render the form with errors
        res.render(path.join(__dirname, '/../views/expand-library.pug'), {
            song_errors: errors,
            github: "https://github.com/TracySpitler",
            user: req.user,
        });
    }
    // otherwise save the song to the db
    else {
        // get the library and save the song to it
        List.findOne({ name: "Library" }, function(err, library) {
            if (err) throw err;

            //create a new Song object
            var newSong = Song({
                title: req.body.title,
                artist: req.body.artist,
                chords: req.body.chords,
                capo: req.body.capo,
                tempo: req.body.tempo,
                duration: req.body.duration,
                key: req.body.key,
                mode: req.body.mode,
                time_signature: req.body.time_sig,
                lists: [],
            });

            // push the song id into the library
            library.songs.push(newSong._id);
            // push the library id into the song's lists
            newSong.lists.push(library._id);

            // save the library
            library.save(function(err) {
                if (err) throw err;
                console.log('Library successfully updated!');
            });

            //save the song
            newSong.save(function(err) {
                if (err) throw err;
                console.log('Song successfully saved!');
            });

            // save song to other lists
            // if a list was selected..
            if (req.body.inList) {
                // make sure it's an array
                var inList = Array.isArray(req.body.inList) ? req.body.inList : [req.body.inList];
                // for each selected list
                for (var i = 0; i < inList.length; i++) {
                    // find it in the database
                    List.findOne({name: inList[i]}, function(err, list) {
                        if (err) throw err;
                        // push the song id into the list
                        list.songs.push(newSong._id);
                        // save the list
                        list.save(function(err) {
                            if (err) throw err;
                            console.log('Pushed song into list!');
                        });
                        // find song to update the lists
                        Song.findOne({_id: newSong._id}, function(err, song) {
                            // push the list id into the song's lists
                            song.lists.push(list._id);
                            //save the song
                            song.save(function(err) {
                                if (err) throw err;
                                console.log('Lists in this song have been updated!');
                            });
                        });
                    });
                }
            }
            // if custom list has a value..
            if (req.body.customList) {

                // create a custom list object
                var customList = List({
                    name: req.body.customList,
                });

                // push the song id into the list
                customList.songs.push(newSong._id);

                // save list to the database
                customList.save(function(err) {
                    if (err) {
                        // render the form with errors
                        res.render(path.join(__dirname, '/../views/expand-library.pug'), {
                            list_errors: err,
                            db_error: "The list \'" + customList.name + "\' already exists! Please rename it.",
                            github: "https://github.com/TracySpitler",
                            user: req.user,
                        });
                    }
                    else {
                        console.log('Custom list saved successfully!')
                        // find song to update the lists
                        Song.findOne({_id: newSong._id}, function(err, song) {
                            // push the list id into the song's lists
                            song.lists.push(customList._id);
                            //save the song
                            song.save(function(err) {
                                if (err) throw err;
                                console.log('Lists in this song have been updated!');
                            });
                        });
                    }
                });
            }

            // go back to the home page
            return res.redirect('/lists');
        });
    }
})

// set up router
module.exports = router;
