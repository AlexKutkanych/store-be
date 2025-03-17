const router = require('express').Router();
const {
  getProfile,
  checkToken,
} = require('../../controllers/user-controller');
const { requireAuth } = require('../../middleware/auth-middleware');

router.use(requireAuth);

router.route('/profile').get(getProfile);
router.route('/token').get(checkToken);

module.exports = router;
