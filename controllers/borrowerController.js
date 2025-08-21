// controllers/borrowerController.js
const Borrower = require('../models/Borrower');

// Apply Loan
const applyLoan = async (req, res) => {
  try {
    const { loanAmount, tenure, interestRate, purpose } = req.body;
    const documents = req.files?.map(file => file.path) || [];

    if (!loanAmount || !tenure || !interestRate || !purpose) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newLoan = new Borrower({
      user: req.user._id,
      loanAmount: Number(loanAmount),
      tenure: Number(tenure),
      interestRate: Number(interestRate),
      purpose,
      documents,
      fundedAmount: 0,
      status: "open"
    });

    await newLoan.save();
    res.status(201).json({ message: "Loan request submitted successfully", loan: newLoan });
  } catch (err) {
    console.error("Loan Apply Error:", err);
    res.status(500).json({ error: "Server error while applying loan" });
  }
};

// ✅ Get All Loans (for Investor Dashboard)
const getAllLoans = async (req, res) => {
  try {
    const loans = await Borrower.find()
      .populate("user", "name email"); // borrower ka naam & email dikhane k liye

    res.json(loans);
  } catch (err) {
    console.error("Get Loans Error:", err);
    res.status(500).json({ error: "Server error while fetching loans" });
  }
};

// ✅ Dono export karne h
module.exports = { applyLoan, getAllLoans };
