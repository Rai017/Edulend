const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanAmount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  purpose: { type: String },
  documents: [String],
  status: { type: String, enum: ['open', 'active', 'closed'], default: 'open' },
  fundedAmount: { type: Number, default: 0 },
  investors: [{ investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }]
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
