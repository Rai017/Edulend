const express = require('express');
const router = express.Router();
const { applyLoan } = require('../controllers/borrowerController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/apply', protect, upload.array('documents', 5), applyLoan);

module.exports = router;
