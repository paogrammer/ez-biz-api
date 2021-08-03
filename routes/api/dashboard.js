const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Order = require('../../models/Order');

router.get('/', auth, async (req, res) => {
  try {
    const ordersCount = await Order.countDocuments({});
    const allOrders = await Order.find();

    let totalSale = 0;
    let totalSaleLastSevenDays = 0;
    let totalSaleLastThirtyDays = 0;
    allOrders.map((order) => {
      if (order?.quantity) {
        totalSale =
          totalSale + parseFloat(order.Price) * parseFloat(order.quantity);

        // To set two dates to two variables
        let date2 = new Date();
        let date1 = new Date(order.purchaseDate);

        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Days < 7) {
          totalSaleLastSevenDays =
            totalSaleLastSevenDays +
            parseFloat(order.Price) * parseFloat(order.quantity);
        }
        if (Difference_In_Days < 30) {
          totalSaleLastThirtyDays =
            totalSaleLastThirtyDays +
            parseFloat(order.Price) * parseFloat(order.quantity);
        }
      }
    });

    const revenues = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: '$Price' } } }
    ]);

    res.status(200).json({
      status: 'success',
      dashboard: {
        ordersCount,
        revenue: revenues[0]?.revenue || null,
        totalSale: totalSale,
        totalSaleLastThirtyDays: totalSaleLastThirtyDays,
        totalSaleLastSevenDays: totalSaleLastSevenDays
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
