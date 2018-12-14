// include the express dependency then instantiate it
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const path = require('path');

// turns data into js object
const bodyParser = require('body-parser');
// mount express validator (this goes after bodyParser)
var validator = require('express-validator');

// auth packages
const passport = require('./config/passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

// express-session setup
app.use(expressSession({
    // random string from .env (for signing cookie)
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // store to mongo (no need to login after every save)
    store: new MongoStore({mongooseConnection: db})
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session());

// JSON data and converted and added to req.body
app.use(bodyParser.json());
// convert GET url
app.use(bodyParser.urlencoded({extended: false}));
//use express validator
app.use(validator());

// pug - template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// include public folder for js and css files
app.use(express.static(path.join(__dirname, "public")));

// routes
const index = require('./routes/index');
app.use('/', index);

const lists = require('./routes/lists');
app.use('/', lists);

// 404 error handling
app.use(function(req, res, next) {
    // if the route doesn't exist..
    if (!req.route)
        // let the user know
        res.status(404).send('<h1>Uh oh! 404 error: page not found</h1><br><a href="/">Go Home</a>');
    next();
});

// export the app
module.exports = app;
