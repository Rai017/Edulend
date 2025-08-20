const mongoose = require('mongoose');

const investSchema = new mongoose.Schema({
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan' },
  amount: Number,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active','completed'], default: 'active' }
});

module.exports = mongoose.model('Investment', investSchema);
