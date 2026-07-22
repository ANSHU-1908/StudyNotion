const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

// Verify JWT Token
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing. Please login." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

// Check if Student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({ success: false, message: "Access denied. Students only." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Role verification failed." });
  }
};

// Check if Instructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.role !== "Instructor") {
      return res.status(403).json({ success: false, message: "Access denied. Instructors only." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Role verification failed." });
  }
};

// Check if Admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Role verification failed." });
  }
};
