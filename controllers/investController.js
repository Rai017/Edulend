// controllers/investController.js
const Loan = require('../models/Loan');
const Investment = require('../models/Investment');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.invest = async (req, res) => {
  try {
    const { amount } = req.body;
    const loan = await Loan.findById(req.params.loanId).populate('borrower');

    if (!loan || loan.status !== 'open') {
      return res.status(400).json({ error: 'Loan not open' });
    }

    if (amount < 500) return res.status(400).json({ error: 'Minimum invest ₹500' });
    if (req.user.walletBalance < amount) return res.status(400).json({ error: 'Insufficient wallet' });

    const remain = loan.amount - loan.fundedAmount;
    const commit = Math.min(remain, amount);

    // Update loan fundedAmount and status
    loan.fundedAmount += commit;
    if (loan.fundedAmount >= loan.amount) loan.status = 'active';
    await loan.save();

    // Deduct from investor wallet
    req.user.walletBalance -= commit;
    await req.user.save();

    await Investment.create({ investor: req.user._id, loan: loan._id, amount: commit });
    await Transaction.create({ user: req.user._id, type: 'invest', amount: commit, meta: { loan: loan._id } });

    res.json({ success: true, committed: commit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
