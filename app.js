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
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://'+process.env.MONGO_HOST+'/'+process.env.MONGO_DATABASE);

// get default connection
var db = mongoose.connection;

// bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// bind connection to connection event (to get notification of connection)
db.once('open', () => console.log('DATABASE CONNECTED SUCCESSFULLY') );

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
