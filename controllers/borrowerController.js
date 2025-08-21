const Borrower = require('../models/Borrower');

async function applyLoan(req, res) {
  try {
    const { loanAmount, tenure, purpose } = req.body;
    const documents = (req.files || []).map(file => file.path);

    // Fixed interest rates market ke hisaab se
    const interestRates = {
      3: 12,
      6: 13,
      12: 14,
      15: 15,
      18: 16
    };

    const interestRate = interestRates[tenure];
    if (!interestRate) return res.status(400).json({ error: 'Invalid tenure selected' });

    const borrower = await Borrower.create({
      user: req.user._id,
      loanAmount,
      tenure,
      purpose,
      interestRate,
      documents
    });

    res.json({ message: 'Loan application submitted', borrower });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { applyLoan };
