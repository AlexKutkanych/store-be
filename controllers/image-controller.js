const Product = require('../models/Product');
const Image = require('../models/Image');

module.exports = {
  async addImage(req, res) {
    try {
      const { alt, productId } = req?.body;

      if (!req?.uploadedImage) {
        return res.status(404).json({ message: 'Image uploading error!' });
      }

      const newImageData = {
        url: req?.uploadedImage?.secure_url,
        alt,
        productId,
      };

      const newImage = await Image.create(newImageData);
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found!' });
      }

      await product.images.push(newImage._id);
      await product.save();

      res.status(201).json({ message: 'Image added successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error adding image', err });
    }
  },
  async getNewProducts(req, res) {
    try {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      const products = await Product.find({ createdAt: { $gt: startOfYear } });

      if (!products) {
        return res.status(404).json({ message: 'No new products found!' });
      }

      res.json(products);
    } catch (err) {
      res.status(400).json({ message: 'Error occurred', err });
    }
  },
};
