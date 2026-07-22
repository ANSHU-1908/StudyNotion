const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: { type: String, required: true },
  subSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubSection" }],
}, { timestamps: true });

const subSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  videoDuration: { type: String },
  timeDuration: { type: String },
}, { timestamps: true });

const Section = mongoose.model("Section", sectionSchema);
const SubSection = mongoose.model("SubSection", subSectionSchema);

module.exports = { Section, SubSection };
