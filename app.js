// include the express dependency then instantiate it
const express = require('express');
const app = express();

// turns data into js object
const bodyParser = require('body-parser');

// JSON data and converted and added to req.body
app.use(bodyParser.json());
// convert GET url
app.use(bodyParser.urlencoded({extended: false}));

// require
const path = require('path');

// pug - template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// include public folder for js and css files
app.use(express.static(path.join(__dirname, "public")));

// routes
const index = require('./routes/index');
app.use('/', index);

// export the app
module.exports = app;
