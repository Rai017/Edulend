const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['borrower', 'investor', 'admin'], default: 'borrower' },
  walletBalance: { type: Number, default: 0 }, // Wallet for investments/credits
  isAdmin: { type: Boolean, default: false } // Optional: admin check
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
