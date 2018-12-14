// include
const express = require('express');
const router = express.Router()
const User = require('../models/User');
const passportLocal = require('../auth/local');
const protect = require('connect-ensure-login').ensureLoggedIn;

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

// POST ** sign up
router.post('/signup', (req, res, next) => {
    require('bcrypt').hash(req.body.password, 10, (err, pass) => {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            password: pass
        })
        user.save((err, user) => {
            if (err) return res.rediect('/');
            passportLocal.authenticate('local', {failuserRedirect: '/start'})(req, res, () => {
                res.redirect('/profile');
            })
        })
    })
});

// POST ** log in
router.post('/login', passportLocal.authenticate('local', {failureRedirect: '/start'}), (req, res, next) => {
    res.redirect('/profile');
});

// log out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

// user profile
router.get('/profile', protect(), (req, res, next) => {
    res.render('profile', {user: req.user});
});

// set up router
module.exports = router;
