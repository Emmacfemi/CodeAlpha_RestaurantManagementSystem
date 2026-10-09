const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  console.error("DEBUG ERROR:", err); // Logs full trace to your terminal

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err
  });

  next();
};

module.exports = errorHandler;