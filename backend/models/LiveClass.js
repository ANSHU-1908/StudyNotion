const mongoose = require("mongoose");

// LiveClass Model
const liveClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  scheduledAt: { type: Date, required: true },
  meetingLink: { type: String },
  roomId: { type: String, unique: true },
  status: { type: String, enum: ["Scheduled", "Live", "Ended"], default: "Scheduled" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

// Payment Model
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number },
  status: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
}, { timestamps: true });

// Rating Model
const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String },
}, { timestamps: true });

const LiveClass = mongoose.model("LiveClass", liveClassSchema);
const Payment = mongoose.model("Payment", paymentSchema);
const Rating = mongoose.model("Rating", ratingSchema);

module.exports = { LiveClass, Payment, Rating };
