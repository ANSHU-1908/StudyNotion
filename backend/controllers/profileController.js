const User = require("../models/User");
const Course = require("../models/Course");
const cloudinary = require("cloudinary").v2;

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("courses", "title thumbnail price avgRating");
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    const updates = { firstName, lastName, bio };

    if (req.files?.profilePicture) {
      const upload = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath, {
        folder: "studynotion/profiles",
        width: 300, height: 300, crop: "fill",
      });
      updates.profilePicture = upload.secure_url;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    res.status(200).json({ success: true, message: "Profile updated!", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Enrolled Courses (Student)
exports.getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "courses",
      populate: [
        { path: "instructor", select: "firstName lastName profilePicture" },
        { path: "sections", populate: { path: "subSections" } },
      ],
    });
    res.status(200).json({ success: true, courses: user.courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Account deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
