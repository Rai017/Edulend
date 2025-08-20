const Loan = require('../models/Loan');
const Investment = require('../models/Investment');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.invest = async (req,res)=>{
  const {amount} = req.body;
  const loan = await Loan.findById(req.params.loanId);
  if(!loan || loan.status!=='open') return res.status(400).json({error:'Loan not open'});
  if(amount < 500) return res.status(400).json({error:'Min invest 500'});
  
  const remain = loan.amount - loan.fundedAmount;
  const commit = Math.min(remain,amount);
  if(req.user.walletBalance < commit) return res.status(400).json({error:'Insufficient wallet'});

  loan.fundedAmount += commit;
  loan.investors.push({investor:req.user._id,amount:commit});
  if(loan.fundedAmount >= loan.amount) loan.status='active';
  await loan.save();

  req.user.walletBalance -= commit;
  await req.user.save();

  await Investment.create({investor:req.user._id,loan:loan._id,amount:commit});
  await Transaction.create({user:req.user._id,type:'invest',amount:commit,meta:{loan:loan._id}});
  res.json({success:true,committed:commit});
};
