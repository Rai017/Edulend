const express = require('express');
const router = express.Router();
const { applyLoan, getAllLoans } = require('../controllers/borrowerController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Loan apply
router.post('/apply', protect, upload.array('documents', 5), applyLoan);

// ✅ Get all loans (Investor Dashboard ke liye)
router.get('/loans', protect, getAllLoans);

module.exports = router;
