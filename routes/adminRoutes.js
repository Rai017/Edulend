const express = require('express');
const router = express.Router();
const {creditWallet,getReserve} = require('../controllers/adminController');
const {protect} = require('../middlewares/authMiddleware');

router.use((req,res,next)=>{ if(!req.user.isAdmin) return res.status(403).json({error:'admin only'}); next(); });
router.post('/credit', creditWallet);
router.get('/reserve', getReserve);
module.exports = router;