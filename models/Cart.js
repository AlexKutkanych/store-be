const { model, Schema } = require('mongoose');

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  color: { type: String, required: true },
  size: { type: String, required: true },
});

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [CartItemSchema],
  totalPrice: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CartSchema.pre('save', function (next) {
  this.totalPrice = this.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  next();
});

const Cart = model('Cart', CartSchema);

module.exports = Cart;
