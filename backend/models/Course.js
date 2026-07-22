const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  avgRating: { type: Number, default: 0 },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  liveClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "LiveClass" }],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
