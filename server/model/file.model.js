import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileId: String,
  originalFileName: String,
  uniqueFileName: String,
  totalWordCount: Number,
  uniqueWordCount: Number,
},{timestamps: true});

const fileModel = mongoose.model("file", fileSchema);
export default fileModel;