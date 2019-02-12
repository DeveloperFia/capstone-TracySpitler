const passport = require('passport');
const User = require('../models/user');

passport.serializeUser((user, next) => {
  // err first, then info to save
  next(null, user._id)
})

passport.deserializeUser((id, next) => {
  // take saved info and find user
  User.findOne({_id: id}, (err, user) => {
    if(err) return next(err);
    // pass to routes
    next(null, user);
  })
})

module.exports = passport;
