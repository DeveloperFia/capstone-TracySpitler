// include
const express = require('express');
const router = express.Router();
const path = require('path');
var request = require('request');

// chord default page
router.get('/chords', (req, res, next) => {

    // render the page with the lists passed as data
    res.render(path.join(__dirname, '/../views/chords.pug'), {
        github: "https://github.com/TracySpitler",
        chords: req.chords,
        user: req.user,
    });
})

// set up router
module.exports = router;
