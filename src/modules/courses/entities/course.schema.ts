import mongoose from 'mongoose';
// let mySchema = mongoose.Schema;
export let CourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Date,
});
