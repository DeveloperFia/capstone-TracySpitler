var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    // set the name of a property and the datatype, requirement, and force each record to have a unique list name
    // and custom error message if missing
    name: {type: String, required: [true, 'a list needs a name'], unique: true},
    difficulty: {type: String, default: 'not set', enum: ['not set', 'very easy', 'easy', 'moderate', 'hard', 'goodbye fingers']},
    play_date: Date,
    created_at: Date,
    updated_at: Date,
    // for library (wouldn't want to get rid of that!) and maybe others
    deletable: {type: Boolean, default: true},
    // relationship
    // an array of song ids that are in the list
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
});

listSchema.pre('save', function(next) {

  var currentDate = new Date();
  // set the updated date to right now
  this.updated_at = currentDate;

  // if their is no created date set it to now
  if(!this.created_at) {
    this.created_at = currentDate;
  }
  // save the model to the database
  next();
})

module.exports = mongoose.model('List', listSchema);
