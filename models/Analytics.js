const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  revenue: {
    type: String,
    required: true
  },
  ordersCount: {
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
  }
});

module.exports = mongoose.model('analytics', UserSchema);
