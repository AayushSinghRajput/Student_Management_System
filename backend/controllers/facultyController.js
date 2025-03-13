const db = require("../config/db");

// Get all faculty members
exports.getAllFaculty = (req, res) => {
  const query = `
    SELECT f.facultyid, f.name, f.email, f.phone, f.designation AS position, d.departname 
    FROM faculty f
    JOIN department d ON f.deparid = d.deparid
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching faculty members:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};
