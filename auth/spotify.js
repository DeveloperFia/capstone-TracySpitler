const passport = require('passport');
const User = require('../models/user');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT_URI
}, (accessToken, refreshToken, profile, next) => {
    var query = { username: profile.emails[0].value },
        update = { accessToken: accessToken },
        options = { upsert: true };
    // Find the document
    User.findOneOrCreate({username: profile.emails[0].value}, {
        username: profile.emails[0].value,
        accessToken: accessToken,
        refreshToken: refreshToken
    }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(null, false);
        next(null, user);
    })
}))

module.exports = passport;
