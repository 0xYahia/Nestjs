import mongoose from 'mongoose';

export let RegSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});
