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

// all lists page
router.get('/lists', (req, res, next) => {
    // render pug template - signup
    res.render('all-lists');
})

// 404 error handling
router.use(function(req, res, next) {
    // if the route doesn't exist..
    if (!req.route)
        // let the user know
        res.status(404).send('<h1>Uh oh! 404 error: page not found</h1><br><a href="/">Go Home</a>');
    next();
});

// set up router
module.exports = router;
