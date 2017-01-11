var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenBlacklistSchema = new Schema({
  token: String,
  expireAt: Date
})

tokenBlacklistSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
