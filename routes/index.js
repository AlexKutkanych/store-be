const router = require('express').Router();
const productRoutes = require('./api/product-routes');
const authRoutes = require('./api/auth-routes');
const userRoutes = require('./api/user-routes');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
  res.status(404).send();
});

module.exports = router;
