const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 mins
});

async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(
      email,
      "OTP Verification - StudyNotion",
      `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:30px;border:1px solid #eee;border-radius:10px;">
        <h2 style="color:#F6C90E;">StudyNotion</h2>
        <p>Your OTP for email verification is:</p>
        <h1 style="background:#161D29;color:#F6C90E;padding:15px;border-radius:8px;text-align:center;letter-spacing:5px;">${otp}</h1>
        <p>This OTP expires in <strong>5 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
      `
    );
  } catch (error) {
    console.log("Error occurred while sending emails: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
