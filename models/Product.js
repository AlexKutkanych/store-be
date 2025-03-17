const { Schema, model } = require('mongoose');

const Size = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
};

const ProductSchema = new Schema({
  vendorCode: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  title: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  composition: { type: String, required: true },
  size: { type: [String], enum: Object.values(Size), required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  collection: { type: String, default: null },
  manufacturer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  files: { type: [String], required: true },
  distribution: { type: Map, of: Number, required: true },
  quantity: { type: Number, required: true },
});

const Product = model('Product', ProductSchema);

module.exports = Product;
