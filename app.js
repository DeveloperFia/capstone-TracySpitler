// include the express dependency then instantiate it
const express = require('express');
const app = express();

// pug - template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// routes
const index = require('./routes/index');
app.use('/', index);

// export the app
module.exports = app;
