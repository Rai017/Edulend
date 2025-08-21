const express = require('express');
const router = express.Router();
const { investLoan } = require('../controllers/investController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/invest', protect, investLoan);   // 👈 ab callback milega

module.exports = router;
