import mongoose, { Schema } from 'mongoose';

export default mongoose.model('session', new Schema({
  _id: String
}));
