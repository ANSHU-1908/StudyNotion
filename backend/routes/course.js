const express = require("express");
const router = express.Router();
const {
  createCourse, getAllCourses, getCourseDetails, updateCourse,
  deleteCourse, getInstructorCourses, toggleCourseStatus,
} = require("../controllers/courseController");
const { addSection } = require("../controllers/sectionController");
const { addSubSection } = require("../controllers/subSectionController");
const { addRating } = require("../controllers/ratingController");
const { auth, isInstructor, isStudent } = require("../middleware/auth");

router.get("/all", getAllCourses);
router.get("/:courseId", getCourseDetails);
router.post("/create", auth, isInstructor, createCourse);
router.put("/update/:courseId", auth, isInstructor, updateCourse);
router.delete("/delete/:courseId", auth, isInstructor, deleteCourse);
router.post("/section", auth, isInstructor, addSection);
router.post("/subsection", auth, isInstructor, addSubSection);
router.get("/instructor/my-courses", auth, isInstructor, getInstructorCourses);
router.put("/toggle-status/:courseId", auth, isInstructor, toggleCourseStatus);
router.post("/rating", auth, isStudent, addRating);

module.exports = router;
