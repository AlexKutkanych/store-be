const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
let path = require('path');

// diskStorage is not working with Vercel
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log('ERR MULTER dest: ');
//     cb(console.log('MULTER ERR: DESTINATION'), process.env.UPLOAD_FOLDER);
//   },
//   filename: function (req, file, cb) {
//     console.log('ERR MULTER filename: ');
//     cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const readImage = multer({ storage, fileFilter });

module.exports = readImage;
