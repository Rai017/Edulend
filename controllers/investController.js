const Loan = require('../models/Loan');
const Investment = require('../models/Investment');

exports.invest = async (req, res) => {
  try {
    const { amount } = req.body;
    const loan = await Loan.findById(req.params.loanId);
    if (!loan || loan.status !== 'open') return res.status(400).json({ error: 'Loan not open' });

    const remaining = loan.loanAmount - loan.fundedAmount;
    const commit = Math.min(remaining, amount);

    // Assuming user wallet balance logic
    if (req.user.walletBalance < commit) return res.status(400).json({ error: 'Insufficient wallet balance' });

    loan.fundedAmount += commit;
    loan.investors.push({ investor: req.user._id, amount: commit });
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
