// routes/auth.js
const express = require("express");
const router = express.Router();
const { sendOTP, signup, login, logout, changePassword } = require("../controllers/authController");
const { auth } = require("../middleware/auth");

router.post("/send-otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/change-password", auth, changePassword);

module.exports = router;
