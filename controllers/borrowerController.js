// controllers/borrowerController.js
const Borrower = require('../models/Borrower');
const Loan = require('../models/Loan');

const INTEREST_RATES = {
  3: 5,    // 3 months -> 5%
  6: 6,    // 6 months -> 6%
  12: 7,   // 12 months -> 7%
  15: 7.5, // 15 months -> 7.5%
  18: 8    // 18 months -> 8%
};

async function applyLoan(req, res) {
  try {
    const { loanAmount, tenure, purpose } = req.body;
    const documents = (req.files || []).map(file => file.path);

    if (!INTEREST_RATES[tenure]) {
      return res.status(400).json({ error: 'Invalid tenure' });
    }

    const interestRate = INTEREST_RATES[tenure];

    const loan = await Loan.create({
      borrower: req.user._id,
      amount: loanAmount,
      tenure,
      interestRate,
      purpose,
      documents,
      fundedAmount: 0,
      status: 'open'
    });

    res.json({ message: 'Loan application submitted', loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { applyLoan };
