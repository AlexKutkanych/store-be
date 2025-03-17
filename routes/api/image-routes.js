const router = require('express').Router();
const { addImage } = require('../../controllers/image-controller');
const uploadImage = require('../../middleware/add-image-middleware');

router.route('/add').post(uploadImage.single('url'), addImage);

module.exports = router;
