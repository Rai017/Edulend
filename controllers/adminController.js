const User = require('../models/User');
const Reserve = require('../models/Reserve');

exports.creditWallet = async (req,res)=>{
  const {userId,amount} = req.body;
  const user = await User.findById(userId);
  user.walletBalance += amount;
  await user.save();
  res.json({success:true});
};

exports.getReserve = async (req,res)=>{
  const r = await Reserve.findOne() || await Reserve.create({});
  res.json(r);
};
