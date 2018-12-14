// include
const express = require('express');
const router = express.Router()
const User = require('../models/User');
const passportLocal = require('../auth/local');

// default page
router.get('/', (req, res, next) => {
    // if user is signed in - take them to all-lists
    if (req.user) {
        return res.redirect('/lists');
    }
    // otherwise take them to sign up/log in
    else {
        return res.redirect('/start');
    }
})

// authorization page
router.get('/start', (req, res, next) => {
    // render pug template - auth
    res.render('auth');
})

// set up router
module.exports = router;
