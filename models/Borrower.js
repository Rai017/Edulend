const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanAmount: { type: Number, required: true },
  tenure: { type: Number, required: true }, // 3,6,12,15,18 months
  interestRate: { type: Number, required: true }, // Fixed per tenure
  purpose: { type: String, required: true },
  documents: [{ type: String }],
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Borrower', borrowerSchema);
