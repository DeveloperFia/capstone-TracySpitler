const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

// use this auth strategy
passport.use(new Strategy((username, password, next) => {
    // check if user exists
    User.findOne({username: username}, (err, user) => {
        // if err send to passport
        if(err) return next(err);
        // if no user, don't log in
        if(!user) return next(null, false, {message: 'This email address isn\'t set up yet. Try signing up instead.'});
        // compare passwords
        bcrypt.compare(password, user.password, (err, res) => {
            // if res and match then log in
            if (res) return next(null, user)
            // if no match, don't log in
            return next(null, false, {message: 'Please enter the correct password.'})
        })
    })
}))

module.exports = passport;
