const express = require("express");
const {
  addAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/", addAttendance);
router.get("/:studentid", getAttendanceByStudent);
router.put("/:attendanceid", updateAttendance);
router.delete("/:attendanceid", deleteAttendance);

module.exports = router;
