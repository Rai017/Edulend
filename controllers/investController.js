const Loan = require('../models/Loan');
const Investment = require('../models/Investment');
const Transaction = require('../models/Transaction');

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: "open" }).populate("borrower", "name");
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
};

exports.invest = async (req, res) => {
  const { amount } = req.body;
  try {
    const loan = await Loan.findById(req.params.loanId);
    if (!loan || loan.status !== "open") return res.status(400).json({ error: "Loan not open" });

    if (amount < 500) return res.status(400).json({ error: "Min invest ₹500" });

    const remaining = loan.amount - loan.fundedAmount;
    const commit = Math.min(remaining, amount);

    if (req.user.walletBalance < commit) return res.status(400).json({ error: "Insufficient wallet balance" });

    loan.fundedAmount += commit;
    loan.investors.push({ investor: req.user._id, amount: commit });
    if (loan.fundedAmount >= loan.amount) loan.status = "active";
    await loan.save();

    req.user.walletBalance -= commit;
    await req.user.save();

    await Investment.create({ investor: req.user._id, loan: loan._id, amount: commit });
    await Transaction.create({ user: req.user._id, type: "invest", amount: commit, meta: { loan: loan._id } });

    res.json({ success: true, committed: commit });
  } catch (err) {
    res.status(500).json({ error: "Investment failed" });
  }
};
