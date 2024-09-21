const path = require("path");
const multer = require("multer");

// images uploaded local useing multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req:any, file:any, cb:any) {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  },
});

const mediaFileUploaded = multer({
  storage: storage,
  fileFilter: function (req:any, file:any, cb:any) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype === "video/mp4" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb("you can only upload images jpg,png,jpeg format");
    }
  },
  // limits: {
  //   fileSize: 1024 * 1024 * 2,
  // },
});
export default mediaFileUploaded
