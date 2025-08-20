const mongoose = require('mongoose');

const txnSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  amount: Number,
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', txnSchema);
