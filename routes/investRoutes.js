const express = require('express');
const router = express.Router();
const { invest, getLoans } = require('../controllers/investController');
const { protect } = require('../middlewares/authMiddleware');

// Get all open loans for investor
router.get("/loans", protect, getLoans);

// Invest in a loan
router.post("/:loanId", protect, invest);

module.exports = router;
