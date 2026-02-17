const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected route
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: req.user
  });
});

module.exports = router;
