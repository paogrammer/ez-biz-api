const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Order = require('../../models/Order');

router.get('/', auth, async (req, res) => {
  try {
    const ordersCount = await Order.countDocuments({});

  

    const revenues = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: '$Price' } } }
    ]);

    res.status(200).json({
      status: 'success',
      dashboard: {
        ordersCount,
        revenue: revenues[0]?.revenue || null
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
