import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileId: {
    type: String,
    unique: true,
    required: true
  },
  originalFileName: String,
  uniqueFileName: String,
  fileSize: Number,
  totalWordCount: Number,
  uniqueWordCount: Number,
},{timestamps: true});

const fileModel = mongoose.model("file", fileSchema);
export default fileModel;