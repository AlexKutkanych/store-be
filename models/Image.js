const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
});

const Image = model('Image', ImageSchema);

module.exports = Image;
