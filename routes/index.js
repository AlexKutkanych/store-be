const router = require('express').Router();
const productRoutes = require('./api/product-routes');
const imageRoutes = require('./api/image-routes');
const authRoutes = require('./api/auth-routes');
const cartRoutes = require('./api/cart-routes');
const userRoutes = require('./api/user-routes');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/images', imageRoutes);
router.use('/cart', cartRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
  res.status(404).send();
});

module.exports = router;
