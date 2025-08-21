const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const Loan = require('../models/Loan');

// Investor gets all open loans
router.get('/loans', protect, async (req, res) => {
  try {
    const loans = await Loan.find({ status: 'open' }).populate('borrower', 'name email');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

module.exports = router;
