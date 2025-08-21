const User = require('../models/User');
const Borrower = require('../models/Borrower');
const Loan = require('../models/Loan');

// Admin only functions

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role'); // sirf required fields
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Borrower.find().populate('user', 'name email'); // borrower info populate
    res.json(loans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
};

// Credit user wallet
exports.creditWallet = async (req,res)=>{
  const {userId,amount} = req.body;
  try {
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({error:'User not found'});
    user.walletBalance += amount;
    await user.save();
    res.json({success:true});
  } catch(err){
    res.status(500).json({error:err.message});
  }
};

// Get reserve info
exports.getReserve = async (req,res)=>{
  const Reserve = require('../models/Reserve');
  try {
    const r = await Reserve.findOne() || await Reserve.create({});
    res.json(r);
  } catch(err){
    res.status(500).json({error:err.message});
  }
};
