const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      let destinationPath = "web-data/images";
      if (file.fieldname === "pengaduan-image-picker") {
        destinationPath = "web-data/pengaduan/images";
      } else if (file.fieldname === "profile-image-input") {
        destinationPath = "web-data/profile/images";
      } else if (file.fieldname === "berita-image-input") {
        destinationPath = "web-data/berita/images";
      }
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      cb(null, uuid() + ".jpg");
    },
  }),
});

module.exports = upload;
