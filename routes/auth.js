// @desc authorization routes
// @routes /auth

// require
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const passportSpotify = require('../auth/spotify');
const passportLocal = require('../auth/local');
const protect = require('connect-ensure-login').ensureLoggedIn('/');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

// sign up - POST
router.post('/signup', (req, res ) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  // save user
  user.save((err, user) => {
    if (err) {
      req.flash('info', 'That email address is already set up. Try logging in.');
      res.redirect('/');
    }
    else {
      // authenticate
      passport.authenticate('local', { failureRedirect: '/', failureFlash: true })(req, res, () => {
        res.redirect('/auth/profile');
      })
    }
  })
});

// login - POST
router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/profile',
  failureRedirect: '/',
  failureFlash: true })
);

// logout - GET
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// spotify authentication - GET
router.get('/spotify', passportSpotify.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-recently-played'],
  showDialog: true
}));

// spotify callback - GET
router.get('/spotify/callback', passportSpotify.authenticate('spotify', {failureRedirect: '/login'}), (req, res, next) => {
  res.redirect('/auth/profile');
});

// user profile - GET
router.get('/profile', protect, (req, res) => {
  res.render("profile");
});

// forgot password - POST
router.post('/forgot', (req, res) => {
  // one after the other
  async.waterfall([
    function(done) {
      //create a token
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      // find user
      User.findOne({ username: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('danger', 'No account with that email address exists.');
          return res.redirect('/');
        }
        // set token & save
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    // send token and link to reset password in an email
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.username,
        from: process.env.GMAIL_EMAIL,
        subject: 'SetList Password Reset',
        text: 'You are receiving this because you (or someone else) has requested the reset of the password for your account: ' + user.username + '\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/auth/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.username + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], // end waterfall
  function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

// reset form - GET
router.get('/reset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('danger', 'Looks like the link to reset your password has expired. If your password is still lost, please try again.');
      return res.redirect('/');
    }
    res.render('./includes/reset', {token: req.params.token});
  });
});

// reset password - POST
router.post('/reset/:token', function(req, res) {
  // one after the other
  async.waterfall([
    function(done) {
      // find user by token
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('danger', 'Looks like the link to reset your password has expired. If your password is still lost, please try again.');
          return res.redirect('back');
        }
        // verify password match
        if(req.body.newpassword === req.body.confirmpassword) {
          user.password = req.body.newpassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          // save new password
          user.save(function(err){
            req.logIn(user, function(err) {
              done(err, user);
            });
          })
        } else {
            req.flash("danger", "Those passwords didn't match. Try again?");
            return res.redirect('back');
        }
      });
    },
    // send a confirmation email
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.username,
        from: process.env.GMAIL_EMAIL,
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' at SetList has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed and you are now logged in.');
        done(err);
      });
    }
  ], // end waterfall
  function(err) {
    res.redirect('/');
  });
});

// set up router
module.exports = router;
