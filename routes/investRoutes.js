const express = require("express");
const router = express.Router();
const { investLoan } = require("../controllers/investController");
const { protect } = require("../middlewares/authMiddleware");  // ✅ yahi import kiya hai

router.post("/:id", protect, investLoan);   // ✅ same naam use kar

module.exports = router;
