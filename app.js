// include the express dependency then instantiate it
const express = require('express');
const app = express();

// add router to app
const index = require('./routes/index');
app.use('/', index);

// export the app
module.exports = app;
