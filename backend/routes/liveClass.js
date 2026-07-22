// routes/liveClass.js
const express = require("express");
const router = express.Router();
const {
  scheduleLiveClass, getLiveClasses, startLiveClass, endLiveClass, joinLiveClass,
} = require("../controllers/liveClassController");
const { auth, isInstructor, isStudent } = require("../middleware/auth");

router.post("/schedule", auth, isInstructor, scheduleLiveClass);
router.get("/:courseId", auth, getLiveClasses);
router.put("/start/:liveClassId", auth, isInstructor, startLiveClass);
router.put("/end/:liveClassId", auth, isInstructor, endLiveClass);
router.post("/join/:liveClassId", auth, joinLiveClass);

module.exports = router;
