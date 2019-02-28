// @desc practice routes
// @routes /practice

// require
const express = require('express');
const router = express.Router();
var path = require('path');
const protect = require('connect-ensure-login').ensureLoggedIn('/');

// random chord
function randomChord() {
  var chords = ["A", "A7", "Am", "Am7", "Ab", "Ab7", "Abm", "Abm7", "B", "B7", "Bm", "Bm7", "Bb", "Bb7", "Bbm", "Bbm7", "C", "C7", "Cm", "Cm7", "C#", "C#7", "C#m", "C#m7", "D", "D7", "Dm", "Dm7", "D#", "D#7", "D#m", "D#m7", "E", "E7", "Em", "Em7", "Eb", "Eb7", "Ebm", "Ebm7", "F", "F7", "Fm", "Fm7", "F#", "F#7", "F#m", "F#m7", "G", "G7", "Gm", "Gm7", "G#", "G#7", "G#m", "G#m7"];
  return chords[Math.floor(Math.random()*chords.length)];
}

// date
function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  // add 0 if only one number
  if(dd<10) {
    dd = '0'+dd
  }
  if(mm<10) {
    mm = '0'+mm
  }
  today = mm + '-' + dd + '-' + yyyy;
  return today;
}

// practice home - GET
router.get('/', protect, (req, res) => {
  res.render('practice', {
    date: getDate(),
    chord: randomChord(),
  });
});

// set up router
module.exports = router;
