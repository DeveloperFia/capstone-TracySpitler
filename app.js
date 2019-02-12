// include the express dependency then instantiate it
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const validator = require('express-validator');

// auth packages
const passport = require('./config/passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
var flash = require('connect-flash');

// express-session setup
app.use(expressSession({
    // random string from .env (for signing cookie)
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // store to mongo (no need to login after every save)
    store: new MongoStore({mongooseConnection: db}),
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: true
    }
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session());
app.use(flash());

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());

// pug - template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// public folder for js and css files
app.use(express.static(path.join(__dirname, "public")));

// save in locals for access elsewhere
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// routes
const public = require('./routes/public');
app.use('/', public);

const auth = require('./routes/auth');
app.use('/auth', auth);

const lists = require('./routes/lists');
app.use('/list', lists);

const songs = require('./routes/songs');
app.use('/song', songs);

const learn = require('./routes/learn');
app.use('/learn', learn);

// 404 error handling
app.use(function(req, res, next) {
  if (!req.route)
    res.status(404).render('notFound');
  next();
});

// export the app
module.exports = app;
