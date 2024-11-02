// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ngoSchema = new mongoose.Schema({
  ngoName: String,
  email: { type: String, unique: true },
  password: String,
  cnpj: { type: String, unique: true },
  cause: String,
});

ngoSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Ngo', ngoSchema);
