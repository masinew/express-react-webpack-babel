import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', new Schema({
  username: String,
  password: String,
  admin: Boolean,
  userInfo: {
    firstName: String,
    lastName: String
  }
}));
