const express = require('express');
const router = express.Router();
const { creditWallet, getReserve, getUsers, getLoans } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

// Protect all admin routes
router.use(protect);
router.use((req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
});

// Routes
router.post('/credit', creditWallet);
router.get('/reserve', getReserve);
router.get('/users', getUsers);
router.get('/loans', getLoans);

module.exports = router;
