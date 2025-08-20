const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 }
});

module.exports = mongoose.model('Reserve', reserveSchema);
