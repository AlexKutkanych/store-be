const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('ERR MULTER dest: ');
    cb(console.log('MULTER ERR: DESTINATION'), process.env.UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    console.log('ERR MULTER filename: ');
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(console.log('MULTER ERR: FILE FILTER'), true);
  } else {
    cb(null, false);
  }
};

const uploadImage = multer({ storage, fileFilter });

module.exports = uploadImage;
