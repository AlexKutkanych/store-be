const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {
  async getNewProducts(req, res) {
    try {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      const products = await Product.find({ createdAt: { $gt: startOfYear } });

      if (!products) {
        return res.status(404).json({ message: 'No new products found!' });
      }

      res.json(products);
    } catch (err) {
      res.status(400).json({ message: 'Error occurred' });
    }
  },

  async createProduct(req, res) {
    try {
      const jobs = await Product.create(req.body);

      res.status(201).json(jobs);
    } catch (err) {
      res.status(400).json(err, 'Error creating product');
    }
  },
};
