import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', new Schema({
  username:   String,
  password:   String,
  admin:      Boolean,
  userInfo: {
    facebookUserId: String,
    googleUserId:   String,
    firstName:      String,
    lastName:       String,
    email:          String,
    gender:         String
  }
}));
