import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  fileId: String,
  uniqueFileName: String,
  originalFileName: String, 
  word: String,
  totalCount: Number,
  synonyms: []
});

const wordModel = mongoose.model("word", wordSchema);

export default wordModel;