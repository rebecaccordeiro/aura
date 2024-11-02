// server/models/Job.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  isRemote: boolean,
  address: String,
  category: String,
  vacancies: int,
  isActive: boolean,
});

jobSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Job', userSchema);
