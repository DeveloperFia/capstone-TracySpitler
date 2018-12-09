// include
const express = require('express');
const router = express.Router()
const path = require('path');

// models
const List = require('../models/List');
const Song = require('../models/Song');

// function that gets all of the lists from the database
let getLists = (req, res, next) => {
    // get all the users
    List.find({}, function(err, lists) {
        // if there is an error, throw it
        if (err)
            console.log('err', err);
        // add a list of films to the request object to be used in different routes
        req.lists = lists;
        // run the next function
        next()
    });
}

// create route to get and render person.pug and pass data
router.get('/lists', getLists, (req, res, next) => {

    // render the page with the lists passed as data
    res.render(path.join(__dirname, '/../views/all-lists.pug'), {
        name: "Tracy Spitler",
        github: "https://github.com/TracySpitler",
        lists: req.lists,
    });
})

// create route to get and render person.pug and pass data
router.get('/expand', getLists, (req, res, next) => {

    // render the page with the lists passed as data
    res.render(path.join(__dirname, '/../views/expand-library.pug'), {
        name: "Tracy Spitler",
        github: "https://github.com/TracySpitler",
        lists: req.lists,
    });
})

// route to save a new list - a POST request to /lists
router.post('/lists', getLists, (req, res, next) => {

    // check for empty values
    req.checkBody('list_name', 'Please give the list a name.').notEmpty();

    // if there are errors..
    var errors = req.validationErrors();
    if (errors){
        // render the form with errors
        res.render(path.join(__dirname, '/../views/expand-library.pug'), {
            list_errors: errors,
            name: "Tracy Spitler",
            github: "https://github.com/TracySpitler" });
            return;
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
                    db_error: "This list already exists! Please give it a different name.",
                    name: "Tracy Spitler",
                    github: "https://github.com/TracySpitler" });
            }
            else {
                console.log('List saved successfully!')
                // go back to the home page
                res.redirect('/lists');
            }
        });
    }
})

// set up router
module.exports = router;
