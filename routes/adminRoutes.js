const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getAllUsers,
  getAllLoans,
  creditWallet,
  getReserve
} = require('../controllers/adminController');

// Admin protect middleware
router.use(protect);
router.use((req, res, next) => {
  if(!req.user || req.user.role !== 'admin'){
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
});

// Routes
router.get('/users', getAllUsers);       // frontend fetch users
router.get('/loans', getAllLoans);       // frontend fetch loans
router.post('/credit', creditWallet);    // credit wallet
router.get('/reserve', getReserve);      // get reserve info

module.exports = router;
