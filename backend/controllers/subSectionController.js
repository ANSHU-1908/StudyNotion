const { Section, SubSection } = require("../models/Section");
const cloudinary = require("cloudinary").v2;

// Add SubSection (Upload Lecture Video)
exports.addSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;
    if (!video) return res.status(400).json({ success: false, message: "Video is required." });

    const videoUpload = await cloudinary.uploader.upload(video.tempFilePath, {
      folder: "studynotion/lectures",
      resource_type: "video",
    });

    const subSection = await SubSection.create({
      title, description,
      videoUrl: videoUpload.secure_url,
      videoDuration: videoUpload.duration?.toString(),
    });

    await Section.findByIdAndUpdate(sectionId, { $push: { subSections: subSection._id } });
    res.status(201).json({ success: true, message: "Lecture uploaded!", subSection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
