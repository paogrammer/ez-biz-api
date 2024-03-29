const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  itemNo: {
    type: Number,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stockAmount: {
    type: Number,
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
  photo: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('inventory', InventorySchema);
