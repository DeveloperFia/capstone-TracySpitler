// @desc public routes
// @routes /index

// require
const express = require('express');
const router = express.Router();
var path = require('path');

// landing page - GET
router.get('/', (req, res) => {
  res.render('landing', {
    msg:'This is the capstone project for DWA.'
  });
});

// chords - GET
router.get('/chords', (req, res) => {
  res.render('chords', {
    msg: 'Chords will be here.'
  });
});

// metronome - GET
router.get('/metronome', (req, res) => {
  res.render('metronome', {
    msg: 'The metronome will be here.'
  });
});

// contact - GET
router.get('/about', (req, res) => {
  res.render('about', {
    msg: 'Contact info will be here.'
  });
});

// set up router
module.exports = router;
