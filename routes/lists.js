// include
const express = require('express');
const router = express.Router()

// models
const List = require('../models/List');
const Song = require('../models/Song');

// all lists page
router.get('/lists', (req, res, next) => {
    // list test
    let list = new List({name: 'Library', deletable: false});
    // validate
    list.validate((err) => {
        if (err)
            console.log('err', err);
    })
    // // save to the database
    // list.save(function(err) {
    //     if (err)
    //         console.log('err', err);
    //     else console.log('List saved successfully!');
    // });

    // song test
    let song = new Song({title: 'Dirty Paws', artist: 'Of Monsters and Men', lists: '5c098659425abb9e0a17aab4', capo: 3});
    // validate
    song.validate((err) => {
        if (err)
            console.log('err', err);
    })
    // // save to the database
    // song.save(function(err) {
    //     if (err)
    //         console.log('err', err);
    //     else console.log('Song saved successfully!');
    // });

    // render pug template - all-lists
    res.render('all-lists');
})

// set up router
module.exports = router;
