let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: String,
  accessToken: String,
  refreshToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
})

userSchema.pre('save', function(next){
  var user = this;
  //check if password is modified, else no need to do anything
  if (!user.isModified('password')) {
    return next()
  }
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
  next()
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

module.exports = mongoose.model('user', userSchema);
