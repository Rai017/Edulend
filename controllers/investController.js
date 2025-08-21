// controllers/investController.js
const Borrower = require('../models/Borrower');

const investLoan = async (req, res) => {
  try {
    const { loanId, amount } = req.body;

    if (!loanId || !amount) {
      return res.status(400).json({ error: "Loan ID and amount required" });
    }

    const loan = await Borrower.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    loan.fundedAmount += Number(amount);
    if (loan.fundedAmount >= loan.loanAmount) {
      loan.status = "funded";
    }

    await loan.save();
    res.json({ message: "Investment successful", loan });
  } catch (err) {
    console.error("Invest Error:", err);
    res.status(500).json({ error: "Server error while investing" });
  }
};

module.exports = { investLoan };   // 👈 ye zaruri hai
