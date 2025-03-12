const express = require("express");
const {
  getAllStudents,
  getStudentWithDepartmentAndAttendance,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getAllStudents); // Get all students (without department)
router.get("/:id", getStudentWithDepartmentAndAttendance); // Get a specific student (with department)
router.post("/", addStudent); // Add a new student
router.put("/:id", updateStudent); // Update a student
router.delete("/:id", deleteStudent); // Delete a student

module.exports = router;
