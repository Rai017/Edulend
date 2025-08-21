const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true }, // months
  interestRate: { type: Number, required: true }, // fixed
  purpose: { type: String },
  status: { type: String, default: 'open' }, // open, active, closed
  fundedAmount: { type: Number, default: 0 },
  investors: [{ investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }],
  documents: [String],
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
