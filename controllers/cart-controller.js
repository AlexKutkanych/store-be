const Cart = require('../models/Cart');
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
      res.status(400).json({ message: 'Error occurred' });
    }
  },

  async addToCart(req, res) {
    try {
      const { productId, color, size, quantity } = req.body;

      let cart = await Cart.findOne({ userId: req.userId });
      const product = await Product.findById(productId);

      if (cart) {
        const productInCart = cart.products.find(
          (p) =>
            p.productId === productId && p.color === color && p.size === size
        );

        if (productInCart) {
          productInCart.quantity += quantity;
        } else {
          cart.products.push({ productId, color, size, quantity });
        }

        cart.totalPrice += product.price * quantity;
        await cart.save();
      } else {
        cart = await Cart.create({
          userId: req.userId,
          products: [{ productId, color, size, quantity }],
          totalPrice: product.price * quantity,
        });

        return res.status(201).json({ message: 'Product added to cart', cart });
      }

      res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
      res.status(400).json(err, 'Error creating product');
    }
  },
};
