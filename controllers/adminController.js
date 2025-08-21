const User = require('../models/User');
const Borrower = require('../models/Borrower');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Borrower.find({}).populate('user');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
