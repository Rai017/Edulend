const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Loan = require("../models/Loan");

// ✅ Get all loans borrowed by logged-in borrower
router.get("/my-loans", protect, async (req, res) => {
  try {
    const loans = await Loan.find({ borrower: req.user._id });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
