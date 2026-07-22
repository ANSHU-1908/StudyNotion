const { LiveClass } = require("../models/LiveClass");
const Course = require("../models/Course");
const { v4: uuidv4 } = require("uuid");

// Schedule Live Class
exports.scheduleLiveClass = async (req, res) => {
  try {
    const { courseId, title, scheduledAt } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    const roomId = uuidv4();
    const meetingLink = `${process.env.FRONTEND_URL}/live/${roomId}`;

    const liveClass = await LiveClass.create({
      title, course: courseId,
      instructor: req.user.id,
      scheduledAt, meetingLink, roomId,
    });

    await Course.findByIdAndUpdate(courseId, { $push: { liveClasses: liveClass._id } });

    res.status(201).json({ success: true, message: "Live class scheduled!", liveClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Live Classes for a Course
exports.getLiveClasses = async (req, res) => {
  try {
    const { courseId } = req.params;
    const liveClasses = await LiveClass.find({ course: courseId })
      .populate("instructor", "firstName lastName profilePicture")
      .sort({ scheduledAt: 1 });
    res.status(200).json({ success: true, liveClasses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Start Live Class
exports.startLiveClass = async (req, res) => {
  try {
    const { liveClassId } = req.params;
    const liveClass = await LiveClass.findById(liveClassId);
    if (!liveClass) return res.status(404).json({ success: false, message: "Live class not found." });
    if (liveClass.instructor.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }
    liveClass.status = "Live";
    await liveClass.save();
    res.status(200).json({ success: true, message: "Live class started!", liveClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// End Live Class
exports.endLiveClass = async (req, res) => {
  try {
    const { liveClassId } = req.params;
    const liveClass = await LiveClass.findByIdAndUpdate(
      liveClassId, { status: "Ended" }, { new: true }
    );
    res.status(200).json({ success: true, message: "Live class ended.", liveClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Join Live Class
exports.joinLiveClass = async (req, res) => {
  try {
    const { liveClassId } = req.params;
    const liveClass = await LiveClass.findById(liveClassId);
    if (!liveClass) return res.status(404).json({ success: false, message: "Live class not found." });
    if (liveClass.status !== "Live") {
      return res.status(400).json({ success: false, message: "Live class is not active." });
    }
    if (!liveClass.participants.includes(req.user.id)) {
      liveClass.participants.push(req.user.id);
      await liveClass.save();
    }
    res.status(200).json({ success: true, roomId: liveClass.roomId, meetingLink: liveClass.meetingLink });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
