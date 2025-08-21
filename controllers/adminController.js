const User = require('../models/User');
const Loan = require('../models/Loan');
const Reserve = require('../models/Reserve');

// Admin: Credit user wallet
exports.creditWallet = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (!userId || !amount) return res.status(400).json({ error: 'UserId and amount required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.walletBalance = (user.walletBalance || 0) + amount;
    await user.save();

    res.json({ success: true, message: `Wallet credited with ${amount}`, balance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Get reserve info
exports.getReserve = async (req, res) => {
  try {
    const reserve = await Reserve.findOne() || await Reserve.create({});
    res.json(reserve);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reserve' });
  }
};

// Admin: Fetch all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean(); // lean() for plain JS objects
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Admin: Fetch all loans with borrower info
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('user', 'name email role') // borrower info
      .lean();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
};
