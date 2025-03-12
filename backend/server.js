const express = require("express");
const cors = require("cors");
require("dotenv").config();
const studentRoutes = require("./routes/studentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/students", studentRoutes);
app.use("/departments", departmentRoutes); // Added department route
app.use("/attendance", attendanceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
