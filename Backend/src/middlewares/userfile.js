const multer = require("multer");

const path = require("path");

let counts = 0;
const uploadtofolder = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "../../images"));
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    counts++;
    cb(null, Date.now() + counts.toString() + ext);
  },
});
const upload = multer({
  storage: uploadtofolder,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  limits: {
    fileSize: 5024 * 5024 * 5,
  },
});

module.exports = {upload};
