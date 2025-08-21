const express = require('express');
const router = express.Router();
const { getUsers, getLoans } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);
router.use((req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
});

router.get('/users', getUsers);
router.get('/loans', getLoans);

module.exports = router;
