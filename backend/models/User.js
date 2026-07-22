const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Instructor", "Admin"], default: "Student" },
  profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  token: { type: String },
  resetPasswordExpires: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
