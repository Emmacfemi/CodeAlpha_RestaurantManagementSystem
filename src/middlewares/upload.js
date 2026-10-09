// middleware/upload.js
const multer = require("multer");
const path = require("path");

// Memory storage keeps file as a buffer for cloud uploads (e.g. Cloudinary/S3)
// Use multer.diskStorage() if storing directly to local disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  }
  callback(new Error("Only image files (jpeg, jpg, png, webp) are allowed!"));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max file size
  fileFilter,
});

module.exports = upload;