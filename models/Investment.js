// models/Investment.js
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
