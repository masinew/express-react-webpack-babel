var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenBlacklist = mongoose.model('TokenBlacklist', new Schema({
  token: String,
  expireAt: Date
}));

tokenBlacklist.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });
module.exports tokenBlacklist;
