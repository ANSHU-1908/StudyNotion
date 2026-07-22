const { instance } = require("../config/razorpay");
const crypto = require("crypto");
const Course = require("../models/Course");
const User = require("../models/User");
const { Payment } = require("../models/LiveClass");
const dotenv = require("dotenv");
dotenv.config();

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });

    if (course.studentsEnrolled.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course." });
    }

    const amount = course.price * 100; // Razorpay uses paise
    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { courseId: course._id.toString(), userId: req.user.id },
    };

    const order = await instance.orders.create(options);

    await Payment.create({
      razorpay_order_id: order.id,
      course: courseId,
      student: req.user.id,
      amount: course.price,
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseName: course.title,
      courseDescription: course.description,
      thumbnail: course.thumbnail,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed." });
    }

    // Enroll student
    await Course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: req.user.id } });
    await User.findByIdAndUpdate(req.user.id, { $push: { courses: courseId } });

    // Update payment record
    await Payment.findOneAndUpdate(
      { razorpay_order_id },
      { razorpay_payment_id, razorpay_signature, status: "Success" }
    );

    res.status(200).json({ success: true, message: "Payment verified! You are now enrolled." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Payment History
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.user.id })
      .populate("course", "title thumbnail price");
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
