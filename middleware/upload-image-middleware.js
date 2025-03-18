const cloudinary = require('cloudinary').v2;

const initiateUploadService = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

const uploadImage = async (req, res, next) => {
  try {
    const result = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(req?.file?.buffer);
    });
    req.uploadedImage = result;
  } catch (error) {
    console.error(error, 'upload ERR');
  } finally {
    next();
  }
};

module.exports = {
  initiateUploadService,
  uploadImage,
};
