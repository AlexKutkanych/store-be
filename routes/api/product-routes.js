const router = require('express').Router();
const {
  createProduct,
  getNewProducts,
  searchProduct,
} = require('../../controllers/product-controller');

router.route('/create').post(createProduct);
router.route('/new').get(getNewProducts);
router.route('/search').post(searchProduct);

module.exports = router;
