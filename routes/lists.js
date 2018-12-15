// include
const express = require('express');
const router = express.Router()
const path = require('path');
const protect = require('connect-ensure-login').ensureLoggedIn;

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

// GET ** get /lists route and send lists as data
router.get('/lists', protect(), getLists, (req, res, next) => {

    // render the page with the lists passed as data
    res.render(path.join(__dirname, '/../views/all-lists.pug'), {
        github: "https://github.com/TracySpitler",
        lists: req.lists,
        user: req.user
    });
})

// GET ** get /expand route
router.get('/expand', protect(), getLists, (req, res, next) => {

    // render the page with the lists passed as data
    res.render(path.join(__dirname, '/../views/expand-library.pug'), {
        github: "https://github.com/TracySpitler",
        lists: req.lists,
        user: req.user
    });
})

// POST ** route to save a new list - a POST request to /lists
router.post('/lists', getLists, (req, res, next) => {

    // check for empty values
    req.checkBody('list_name', 'Please give the list a name.').notEmpty();

    // if there are errors..
    var errors = req.validationErrors();
    if (errors){
        // render the form with errors
        res.render(path.join(__dirname, '/../views/expand-library.pug'), {
            list_errors: errors,
            github: "https://github.com/TracySpitler",
            user: req.user,
        });
    }
    // otherwise save the list to the db
    else {
        // create a new list object
        var newList = List({
            name: req.body.list_name,
            difficulty: req.body.list_difficulty,
        });

        // save list to the database
        newList.save(function(err) {
            if (err) {
                // render the form with errors
                res.render(path.join(__dirname, '/../views/expand-library.pug'), {
                    list_errors: err,
                    db_error: "The list \'" + newList.name + "\' already exists! Please rename it.",
                    github: "https://github.com/TracySpitler",
                    user: req.user,
                });
            }
            else {
                console.log('List saved successfully!')
                // go back to the home page
                res.redirect('/lists');
            }
        });
    }
})

// GET ** get single list details
router.get('/lists/:id', protect(), getLists, getSongs, (req, res, next) => {
    // get the list by the params id
    List.find({ _id: req.params.id }, function(err, list) {
        if (err) {
            // render the lists page with errors
            res.render(path.join(__dirname, '/../views/all-lists.pug'), {
                errors: err,
                github: "https://github.com/TracySpitler",
                user: req.user,
            });
        }

        // find songs in this list
        Song.find({lists: req.params.id }, function(err, songs) {
            if (err) {
                // render the lists page with errors
                res.render(path.join(__dirname, '/../views/all-lists.pug'), {
                    errors: err,
                    github: "https://github.com/TracySpitler",
                    user: req.user,
                });
            }

            // render the page with both lists and songs passed as data
            res.render(path.join(__dirname, '/../views/list.pug'), {
                github: "https://github.com/TracySpitler",
                list: req.params.id,
                songs: songs,
                lists: req.lists,
                user: req.user,
            });
        });
    });
})

// POST ** update a list
router.post('/lists/:id', getLists, (req, res, next) => {

    // get a list with ID parameter
    List.findById(req.params.id, function(err, list) {
        if (err) throw err;

        // update the list
        list.name = req.body.list_name;
        // if the difficulty was changed
        if (req.body.list_difficulty >= 0) {
            list.difficulty = req.body.list_difficulty;
        }
        else {
            list.difficulty = list.difficulty;
        }

        // save the list
        list.save(function(err) {
            if (err) throw err;
            console.log('List successfully updated!');
        });
    });
    // redirect
    res.redirect('/lists/' + req.params.id);
})

// DELETE ** delete a list
router.delete('/lists/:id', getLists, (req, res, next) => {
    // get the library
    List.find({ name: "Library" }, function(err, library) {
        if (err) {
            // render the lists page with errors
            res.render(path.join(__dirname, '/../views/all-lists.pug'), {
                errors: err,
                github: "https://github.com/TracySpitler",
                user: req.user,
            });
        }
        else {
            // as long as the list is not the Library
            if (req.params.id != library[0]._id) {
                // find the list with id
                List.findByIdAndDelete(req.params.id, function(err) {
                    if (err) throw err;
                    // the list has been deleted
                    console.log('List deleted!');
                });

                // render the page with the lists passed as data
                res.render(path.join(__dirname, '/../views/all-lists.pug'), {
                    github: "https://github.com/TracySpitler",
                    lists: req.lists,
                    user: req.user,
                });
            }
            else {
                console.log("The Library cannot be deleted.");
            }
        }
    })
})

// set up router
module.exports = router;
