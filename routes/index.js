// include
const express = require('express');
const router = express.Router()

// default page
router.get('/', (req, res, next) => {
    // if user is signed in - take them to all-lists
    if (typeof user !== 'undefined' && user) {
        return res.redirect('/lists');
    }
    // otherwise take them to sign up/log in
    else {
        return res.redirect('/lists');
    }
})

// authorization page
router.get('/auth', (req, res, next) => {
    // render pug template - auth
    res.render('auth');
})

// set up router
module.exports = router;
