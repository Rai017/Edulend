const User = require('../models/User');
const Borrower = require('../models/Borrower');
const Loan = require('../models/Loan');
const Reserve = require('../models/Reserve');

// Credit wallet (admin use)
exports.creditWallet = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.walletBalance += amount;
    await user.save();

    res.json({ success: true, walletBalance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reserve info
exports.getReserve = async (req, res) => {
  try {
    const r = await Reserve.findOne() || await Reserve.create({});
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users for admin dashboard
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role'); // only select fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all loans for admin dashboard
exports.getLoans = async (req, res) => {
  try {
    const loans = await Borrower.find()
      .populate('user', 'name email') // borrower info
      .select('loanAmount tenure purpose status'); // fields to show
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
