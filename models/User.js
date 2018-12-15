let mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    // set the name of a property and the datatype, requirement and custom error message if missing
    name: String,
    username: {type: String, required: [true, 'a user needs an email'], unique: true},
    password: String
})

module.exports = mongoose.model('User', userSchema);
