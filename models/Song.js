var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    // set the name of a property and the datatype, requirement
    // and custom error message if missing
    title: {type: String, required: [true, 'a song needs a title']},
    artist: {type: String, required: [true, 'an artist needs a name']},
    tempo: Number,
    duration: Number,
    key: Number,
    mode: Boolean,
    time_signature: Number,
    spotify_uri: String,
    spotify_id: String,
    // relationship
    // an array of list ids that the song is in
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
});

module.exports = mongoose.model('Song', songSchema)
