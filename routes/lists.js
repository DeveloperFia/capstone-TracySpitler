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

// set up router
module.exports = router;
