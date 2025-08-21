const Borrower = require('../models/Borrower');

async function applyLoan(req, res) {
  try {
    const { loanAmount, tenure, purpose } = req.body;

    // Fixed interest rate based on tenure
    let interestRate = 0;
    if (tenure == 3) interestRate = 8;
    else if (tenure == 6) interestRate = 10;
    else if (tenure == 12) interestRate = 12;
    else if (tenure == 15) interestRate = 14;
    else if (tenure == 18) interestRate = 16;
    else return res.status(400).json({ error: 'Invalid tenure' });

    const documents = (req.files || []).map(file => file.path);

    const borrower = await Borrower.create({
      user: req.user._id,
      loanAmount,
      tenure,
      interestRate,
      purpose,
      documents,
      status: 'open',
      fundedAmount: 0
    });

    res.json({ message: 'Loan application submitted', borrower });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { applyLoan };
