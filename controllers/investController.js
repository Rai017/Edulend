const Loan = require('../models/Borrower');
const Investment = require('../models/Investment');

exports.invest = async (req, res) => {
  try {
    const { amount } = req.body;
    const loan = await Loan.findById(req.params.loanId).populate('user');
    if (!loan || loan.status !== 'open') return res.status(400).json({ error: 'Loan not open' });
    if (amount < 500) return res.status(400).json({ error: 'Minimum invest 500' });

    const remain = loan.loanAmount - loan.fundedAmount;
    const commit = Math.min(remain, amount);
    if (req.user.walletBalance < commit) return res.status(400).json({ error: 'Insufficient wallet' });

    loan.fundedAmount += commit;
    if (loan.fundedAmount >= loan.loanAmount) loan.status = 'active';
    await loan.save();

    req.user.walletBalance -= commit;
    await req.user.save();

    await Investment.create({ investor: req.user._id, loan: loan._id, amount: commit });

    res.json({ success: true, committed: commit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
