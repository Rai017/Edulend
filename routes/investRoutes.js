// routes/investRoutes.js
const express = require('express');
const router = express.Router();
const { investLoan } = require('../controllers/investController');
const { protect } = require('../middlewares/authMiddleware');

// Loan ID URL me pass hoga
router.post('/:loanId', protect, investLoan);

module.exports = router;
