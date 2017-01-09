var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  username: String,
  password: String,
  admin: Boolean,
  userInfo: {
    firstName: String,
    lastName: String
  }
}));
