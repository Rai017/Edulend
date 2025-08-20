const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  loanAmount: Number,
  tenure: Number,
  purpose: String,
  documents: [String],
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Borrower', borrowerSchema);
