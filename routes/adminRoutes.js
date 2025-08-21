const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllUsers, getAllLoans } = require('../controllers/adminController');

router.use(protect);
router.use((req, res, next) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
});

router.get('/users', getAllUsers);
router.get('/loans', getAllLoans);

module.exports = router;
