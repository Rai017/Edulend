const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { 
    type: String, 
    enum: ['borrower', 'investor', 'admin'], 
    default: 'borrower' 
  }
});

module.exports = mongoose.model('User', userSchema);
