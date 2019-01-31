const passport = require('passport');
const User = require('../models/User');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/spotify/callback'
}, (accessToken, refreshToken, profile, next) => {
  //console.log(profile);
    User.findOneOrCreate({username: profile.emails[0].value}, {
        username: profile.emails[0].value,
    }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(null, false);
        next(null, user);
    })
}))

module.exports = passport;
