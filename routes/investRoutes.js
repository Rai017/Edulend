const express = require('express');
const router = express.Router();
const { invest } = require('../controllers/investController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/:loanId', protect, invest);

module.exports = router;
