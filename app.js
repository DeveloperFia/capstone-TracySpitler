// include the express dependency then instantiate it
const express = require('express');
const app = express();

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

// export the app
module.exports = app;
