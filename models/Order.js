const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: Date,
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
  }
});

module.exports = mongoose.model('order', UserSchema);
