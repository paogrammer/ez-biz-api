const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'inventory',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  },
  customerNumber: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'user'
  },
  quantity: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('order', OrderSchema);
