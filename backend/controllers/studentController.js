const db = require("../config/db");

// Get All Students (Without Department)
const getAllStudents = (req, res) => {
  const sql =
    "SELECT id, rollno, name, email, phone, dob, address, year FROM student";

  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    res.json(result);
  });
};

// Get Student By ID (With Department & Attendance)
const getStudentWithDepartmentAndAttendance = (req, res) => {
  const { id } = req.params;

  const sqlStudent = `
    SELECT s.*, d.departname
    FROM student s
    LEFT JOIN department d ON s.deparid = d.deparid
    WHERE s.id = ?`;

  const sqlAttendance = `
    SELECT attendanceid, date, status
    FROM attendance
    WHERE studentid = ?`;

  const sqlTotalAttendance = `
    SELECT COUNT(*) AS totalAttendanceDays 
    FROM attendance 
    WHERE studentid = ? AND status = 'Present'`;

  db.query(sqlStudent, [id], (err, studentResult) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    if (studentResult.length === 0)
      return res.status(404).json({ error: "Student not found" });

    db.query(sqlAttendance, [id], (err, attendanceResult) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Database error: " + err.message });

      db.query(sqlTotalAttendance, [id], (err, totalResult) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error: " + err.message });

        res.json({
          ...studentResult[0],
          attendance: attendanceResult,
          totalAttendanceDays: totalResult[0].totalAttendanceDays, // Added total attendance count
        });
      });
    });
  });
};

// Add New Student (With Default Attendance)
const addStudent = (req, res) => {
  try {
    const { rollno, name, email, phone, dob, address, year, deparid } =
      req.body;

    if (
      !rollno ||
      !name ||
      !email ||
      !phone ||
      !dob ||
      !address ||
      !year ||
      !deparid
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const formattedDob = new Date(dob).toISOString().split("T")[0];

    const sqlStudent = `
      INSERT INTO student (rollno, name, email, phone, dob, address, year, deparid)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      sqlStudent,
      [
        rollno,
        name,
        email,
        phone,
        formattedDob,
        address,
        parseInt(year, 10),
        deparid,
      ],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error: " + err.message });

        const studentId = result.insertId;

        // Add Initial Attendance Record
        const sqlAttendance = `INSERT INTO attendance (studentid, date, status) VALUES (?, CURDATE(), 'Absent')`;

        db.query(sqlAttendance, [studentId], (err) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Database error: " + err.message });

          res.json({
            message: "Student added successfully with initial attendance",
            id: studentId,
          });
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Update Student
const updateStudent = (req, res) => {
  try {
    const { id } = req.params;
    const { rollno, name, email, phone, dob, address, year, deparid } =
      req.body;

    if (
      !rollno ||
      !name ||
      !email ||
      !phone ||
      !dob ||
      !address ||
      !year ||
      !deparid
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const formattedDob = new Date(dob).toISOString().split("T")[0];

    const sql = `UPDATE student SET rollno=?, name=?, email=?, phone=?, dob=?, address=?, year=?, deparid=? WHERE id=?`;

    db.query(
      sql,
      [
        rollno,
        name,
        email,
        phone,
        formattedDob,
        address,
        parseInt(year, 10),
        deparid,
        id,
      ],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error: " + err.message });
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "Student not found" });

        res.json({ message: "Student updated successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Delete Student (Also Deletes Attendance Records)
const deleteStudent = (req, res) => {
  try {
    const { id } = req.params;

    db.query("DELETE FROM attendance WHERE studentid=?", [id], (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Database error: " + err.message });

      db.query("DELETE FROM student WHERE id=?", [id], (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error: " + err.message });
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "Student not found" });

        res.json({
          message: "Student and attendance records deleted successfully",
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentWithDepartmentAndAttendance,
  addStudent,
  updateStudent,
  deleteStudent,
};
