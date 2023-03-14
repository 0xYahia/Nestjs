import mongoose from 'mongoose';
// let mySchema = mongoose.Schema;
export let StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  coursesIDS: {
    type: mongoose.Types.ObjectId,
    ref: 'Courses',
  },
});
