const db = require("../config/db");

// Add Attendance Record
const addAttendance = (req, res) => {
  const { studentid, date, status } = req.body;

  if (!studentid || !date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO attendance (studentid, date, status) VALUES (?, STR_TO_DATE(?, '%Y-%m-%d'), ?)`;

  db.query(sql, [studentid, date, status], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });

    res.json({
      message: "Attendance added successfully",
      attendanceid: result.insertId,
    });
  });
};

// Get Attendance for a Student
const getAttendanceByStudent = (req, res) => {
  const { studentid } = req.params;

  const sql =
    "SELECT attendanceid, date, status FROM attendance WHERE studentid = ?";
  db.query(sql, [studentid], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });

    res.json(result);
  });
};

// Update Attendance
const updateAttendance = (req, res) => {
  const { attendanceid } = req.params;
  const { date, status } = req.body;

  const sql = "UPDATE attendance SET date=?, status=? WHERE attendanceid=?";
  db.query(sql, [date, status, attendanceid], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });

    res.json({ message: "Attendance updated successfully" });
  });
};

// Delete Attendance
const deleteAttendance = (req, res) => {
  const { attendanceid } = req.params;

  const sql = "DELETE FROM attendance WHERE attendanceid=?";
  db.query(sql, [attendanceid], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });

    res.json({ message: "Attendance deleted successfully" });
  });
};

module.exports = {
  addAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
};
