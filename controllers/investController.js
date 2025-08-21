const Loan = require('../models/Loan');
const Investment = require('../models/Investment');
const Transaction = require('../models/Transaction');

exports.invest = async (req, res) => {
  try {
    const { amount } = req.body;
    const { loanId } = req.params;

    // loan check
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    if (loan.status !== 'open') return res.status(400).json({ error: 'Loan not open for investment' });

    // min invest 500
    if (amount < 500) return res.status(400).json({ error: 'Minimum invest is 500' });

    // wallet check
    if (!req.user || req.user.walletBalance < amount)
      return res.status(400).json({ error: 'Insufficient wallet balance' });

    const remaining = loan.amount - loan.fundedAmount;
    const commit = Math.min(remaining, amount);

    // update loan
    loan.fundedAmount += commit;
    loan.investors = loan.investors || [];
    loan.investors.push({ investor: req.user._id, amount: commit });
    if (loan.fundedAmount >= loan.amount) loan.status = 'active';
    await loan.save();

    // update user wallet
    req.user.walletBalance -= commit;
    await req.user.save();

    // create investment & transaction records
    await Investment.create({ investor: req.user._id, loan: loan._id, amount: commit });
    await Transaction.create({ user: req.user._id, type: 'invest', amount: commit, meta: { loan: loan._id } });

    res.json({ success: true, committed: commit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
