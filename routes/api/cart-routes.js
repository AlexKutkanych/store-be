const router = require('express').Router();
const {
  addToCart,
} = require('../../controllers/cart-controller');
const { requireAuth } = require('../../middleware/auth-middleware');

router.use(requireAuth);

// router.route('/retrieve').get(getNewProducts);
router.route('/add').post(addToCart);

module.exports = router;
