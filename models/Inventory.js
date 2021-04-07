const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  }
});

module.exports = mongoose.model('inventory', UserSchema);
