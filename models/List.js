var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    // set the name of a property and the datatype, requirement, and force each record to have a unique list name
    // and custom error message if missing
    name: {type: String, required: [true, 'this list needs a name'], unique: true},
    difficulty: {type: Number, default: 0, min: 0, max: 3},
    created_at: Date,
    updated_at: Date,
    // for library (wouldn't want to get rid of that!) and maybe others
    deletable: {type: Boolean, default: true},
    // relationship
    // an array of song ids that are in the list
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Songs'}],
});

module.exports = mongoose.model('List', listSchema);
