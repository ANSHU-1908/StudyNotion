const Course = require("../models/Course");
const { Rating } = require("../models/LiveClass");

// Add Rating
exports.addRating = async (req, res) => {
  try {
    const { courseId, rating, review } = req.body;
    const course = await Course.findById(courseId);
    if (!course.studentsEnrolled.includes(req.user.id)) {
      return res.status(403).json({ success: false, message: "You must enroll first." });
    }
    const newRating = await Rating.create({ user: req.user.id, course: courseId, rating, review });
    await Course.findByIdAndUpdate(courseId, { $push: { ratings: newRating._id } });
    const allRatings = await Rating.find({ course: courseId });
    const avg = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;
    await Course.findByIdAndUpdate(courseId, { avgRating: avg });
    res.status(201).json({ success: true, message: "Rating added!", newRating });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
