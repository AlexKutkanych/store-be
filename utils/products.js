const Image = require('../models/Image');

const combineProductsAndImages = async (products) =>
  await Promise.all(
    products.map(async (product) => {
      const images = await Image.find({ _id: { $in: product.images } });

      return { ...product.toObject(), images };
    })
  );

module.exports = { combineProductsAndImages };
