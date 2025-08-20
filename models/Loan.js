const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  fundedAmount: { type: Number, default: 0 },
  interestRate: Number,
  tenureMonths: Number,
  status: { type: String, enum: ['open','active','repaid','defaulted'], default: 'open' },
  investors: [{ investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }],
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date
});

module.exports = mongoose.model('Loan', loanSchema);
