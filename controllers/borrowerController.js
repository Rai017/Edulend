const Loan = require('../models/Loan');

const TENURE_INTEREST = {
  3: 10,
  6: 12,
  12: 15,
  18: 18,
};

async function applyLoan(req, res) {
  try {
    const { loanAmount, tenure, purpose } = req.body;
    const documents = (req.files || []).map(file => file.path);

    // Fixed interest rate based on tenure
    const interestRate = TENURE_INTEREST[tenure];
    if (!interestRate) return res.status(400).json({ error: 'Invalid tenure' });

    const loan = await Loan.create({
      user: req.user._id,
      amount: loanAmount,
      tenure,
      interestRate,
      purpose,
      documents,
    });

    res.json({ message: 'Loan application submitted', loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { applyLoan };
