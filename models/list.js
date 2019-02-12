var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    // set the name of a property and the datatype, requirement, and force each record to have a unique list name
    // and custom error message if missing
    name: {type: String, required: [true, 'please name the list']},
    difficulty: {type: Number, default: 0, enum: [0, 1, 2, 3]},
    play_date: Date,
    created_at: Date,
    updated_at: Date,
    // for library (wouldn't want to get rid of that!) and maybe others
    deletable: {type: Boolean, default: true},
    // relationship
    // an array of song ids that are in the list
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'song'}],
    user: {type: String, required: true, unique: true}
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

module.exports = mongoose.model('list', listSchema);
