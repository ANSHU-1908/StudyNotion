const Course = require("../models/Course");
const { Section } = require("../models/Section");

// Add Section
exports.addSection = async (req, res) => {
  try {
    const { courseId, sectionName } = req.body;
    const section = await Section.create({ sectionName });
    await Course.findByIdAndUpdate(courseId, { $push: { sections: section._id } });
    res.status(201).json({ success: true, message: "Section added!", section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
