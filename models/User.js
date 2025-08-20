const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  walletBalance: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
