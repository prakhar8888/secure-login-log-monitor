const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const logger = require("../logs/logger");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    logger.info(`REGISTER SUCCESS - User: ${username}`);
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "User already exists" });
    }

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      logger.warn(`LOGIN FAILED - User not found: ${username}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn(`LOGIN FAILED - Wrong password: ${username}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`LOGIN SUCCESS - User logged in: ${username}`);
    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
