const router = require('express').Router();
const { addImage } = require('../../controllers/image-controller');
const readImage = require('../../middleware/read-image-middleware');
const { uploadImage } = require('../../middleware/upload-image-middleware');

router.route('/add').post(readImage.single('url'), uploadImage, addImage);

module.exports = router;
