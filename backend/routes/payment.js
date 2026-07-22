// routes/payment.js
const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment, getPaymentHistory } = require("../controllers/paymentController");
const { auth, isStudent } = require("../middleware/auth");

router.post("/create-order", auth, isStudent, createOrder);
router.post("/verify", auth, isStudent, verifyPayment);
router.get("/history", auth, isStudent, getPaymentHistory);

module.exports = router;
