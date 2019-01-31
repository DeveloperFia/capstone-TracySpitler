let mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: String
})

userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc, callback) {
  const self = this;
  self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(doc, (err, result) => {
        return callback(err, result);
      });
  });
};

module.exports = mongoose.model('User', userSchema);
