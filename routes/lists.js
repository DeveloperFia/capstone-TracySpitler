// include
const express = require('express');
const router = express.Router()
const List = require('../models/List');

// all lists page
router.get('/lists', (req, res, next) => {
    let test = new List({name: 'Test List', difficulty: 2});
    test.validate((err) => {
        console.log('err',err);
    })
    console.log('\n\rtesting!');
    console.log('\n\rname:', test.name,
                '\n\rdifficulty:', test.difficulty,
                '\n\rcreated_at:', test.created_at,
                '\n\rupdated_at:', test.updated_at,
                '\n\rsongs:', test.songs);
    // render pug template - signup
    res.render('all-lists');
})

// set up router
module.exports = router;
