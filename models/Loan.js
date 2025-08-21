const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, enum: [3, 6, 12, 15, 18], required: true },
  interestRate: { type: Number, required: true }, // Fixed by backend
  purpose: { type: String },
  documents: [{ type: String }],
  fundedAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'active', 'closed'], default: 'open' },
  investors: [
    {
      investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
