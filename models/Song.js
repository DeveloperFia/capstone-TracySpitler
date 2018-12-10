var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    // set the name of a property and the datatype, requirement
    // and custom error message if missing
    title: {type: String, required: [true, 'a song needs a title']},
    artist: {type: String, required: [true, 'an artist needs a name']},
    chords: [],
    capo: {type: Number, min: 0, max: 10},
    tempo: Number,
    duration: Number,
    key: Number,
    mode: Boolean,
    time_signature: Number,
    date_added: Date,
    last_played: Date,
    spotify_uri: {type: String, unique: [true, 'uri already exists'], sparse: true},
    spotify_id: {type: String, unique: [true, 'spotify id already exists'], sparse: true},
    // relationship
    // an array of list ids that the song is in
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
});

songSchema.pre('save', function(next) {

  var currentDate = new Date();// if their is no date added set it to now
  if(!this.date_added) {
    this.date_added = currentDate;
  }
  // save the model to the database
  next();
})

module.exports = mongoose.model('Song', songSchema)
