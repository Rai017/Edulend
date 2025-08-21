const Loan = require('../models/Loan');

async function applyLoan(req, res) {
  try {
    const { loanAmount, tenure, purpose } = req.body;
    const documents = (req.files || []).map(file => file.path);

    // Fixed interest rate based on tenure
    let interestRate;
    switch (parseInt(tenure)) {
      case 3: interestRate = 12; break;
      case 6: interestRate = 14; break;
      case 12: interestRate = 16; break;
      case 15: interestRate = 17; break;
      case 18: interestRate = 18; break;
      default: interestRate = 15;
    }

    const loan = await Loan.create({
      borrower: req.user._id,
      loanAmount,
      tenure,
      interestRate,
      purpose,
      documents
    });

    res.json({ message: 'Loan application submitted', loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { applyLoan };
