const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "auth.log");

const logger = {
  info: (message) => {
    const log = `[INFO] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, log);
  },

  error: (message) => {
    const log = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, log);
  }
};

module.exports = logger;
