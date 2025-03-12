const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Fetch all departments
router.get("/", (req, res) => {
  const sql = "SELECT deparid, departname FROM department";
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    res.json(results);
  });
});

module.exports = router;
