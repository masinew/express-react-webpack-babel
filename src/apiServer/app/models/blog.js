import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Blog', new Schema({
  blogNumber: Number,
  topic: String,
  shortInfo: String,
  details: [
    String
  ]
}));
