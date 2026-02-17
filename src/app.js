require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Auth routes
app.use("/auth", authRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Secure Login & Log Monitoring System is running");
});

module.exports = app;
