const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getEnrolledCourses, deleteAccount } = require("../controllers/profileController");
const { auth, isStudent } = require("../middleware/auth");

router.get("/", auth, getProfile);
router.put("/update", auth, updateProfile);
router.get("/enrolled-courses", auth, isStudent, getEnrolledCourses);
router.delete("/delete", auth, deleteAccount);

module.exports = router;
