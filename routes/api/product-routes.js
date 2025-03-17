const router = require('express').Router();
const {
  createProduct,
  getNewProducts,
} = require('../../controllers/product-controller');

router.route('/create').post(createProduct);
router.route('/new').get(getNewProducts);

module.exports = router;
