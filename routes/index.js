// include
const express = require('express');
const router = express.Router()

// default page
router.get('/', (req, res, next) => {
    // render pug template - landing
    res.render('landing');
})

// login page
router.get('/login', (req, res, next) => {
    // render pug template - login
    res.render('login');
})

// sign-up page
router.get('/signup', (req, res, next) => {
    // render pug template - signup
    res.render('signup');
})

// set up router
module.exports = router;
