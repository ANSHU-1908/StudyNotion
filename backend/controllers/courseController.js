const Course = require("../models/Course");
const { Section, SubSection } = require("../models/Section");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category, tags } = req.body;
    const thumbnail = req.files?.thumbnail;

    if (!title || !description || !price || !category || !thumbnail) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const thumbnailUpload = await cloudinary.uploader.upload(thumbnail.tempFilePath, {
      folder: "studynotion/thumbnails",
    });

    const course = await Course.create({
      title, description, price,
      category,
      tags: tags ? JSON.parse(tags) : [],
      thumbnail: thumbnailUpload.secure_url,
      instructor: req.user.id,
    });

    await User.findByIdAndUpdate(req.user.id, { $push: { courses: course._id } });

    res.status(201).json({ success: true, message: "Course created successfully!", course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Published Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "Published" })
      .populate("instructor", "firstName lastName email profilePicture")
      .select("-studentsEnrolled");
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Course Details
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate("instructor", "firstName lastName email profilePicture bio")
      .populate({ path: "sections", populate: { path: "subSections" } })
      .populate("ratings");
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }
    if (req.files?.thumbnail) {
      const thumbnail = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath, {
        folder: "studynotion/thumbnails",
      });
      updates.thumbnail = thumbnail.secure_url;
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, { new: true });
    res.status(200).json({ success: true, message: "Course updated!", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({ success: true, message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Instructor Courses
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .populate({ path: "sections", populate: { path: "subSections" } });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Publish / Unpublish Course
exports.toggleCourseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    course.status = course.status === "Published" ? "Draft" : "Published";
    await course.save();
    res.status(200).json({ success: true, message: `Course ${course.status}!`, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
