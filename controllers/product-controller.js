const Product = require('../models/Product');
const { combineProductsAndImages } = require('../utils/products');

module.exports = {
  async getNewProducts(req, res) {
    try {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      const products = await Product.find({ createdAt: { $gt: startOfYear } });

      if (!products) {
        return res.status(404).json({ message: 'No new products found!' });
      }

      const finalProducts = await combineProductsAndImages(products);
      res.status(200).json(finalProducts);
    } catch (err) {
      res.status(400).json({ message: 'Error occurred', err });
    }
  },

  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);

      res.status(201).json(product);
    } catch (err) {
      res.status(400).json(err, 'Error creating product');
    }
  },
  async searchProduct(req, res) {
    try {
      const { category, subcategory } = req.body;
      const query = { category };

      if (subcategory) {
        query.subcategory = subcategory;
      }

      const products = await Product.find(query);

      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No products found!' });
      }

      const finalProducts = await combineProductsAndImages(products);
      res.status(200).json(finalProducts);
    } catch (err) {
      res.status(400).json({ message: 'Error finding products', err });
    }
  },
};
