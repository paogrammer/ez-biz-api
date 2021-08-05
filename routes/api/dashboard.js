const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Order = require('../../models/Order');
const Inventory = require('../../models/Inventory');

router.get('/', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const ordersCount = await Order.countDocuments({ userID });
    const allOrders = await Order.find({ userID });

    let totalSale = 0;
    let totalSaleLastSevenDays = 0;
    let totalSaleLastThirtyDays = 0;
    let revenues = 0;

    allOrders.map((order) => {
      if (order?.quantity) {
        revenues =
          revenues + parseFloat(order.quantity) * parseFloat(order.Price);
        totalSale = totalSale + parseFloat(order.quantity);

        // To set two dates to two variables
        let date2 = new Date();
        let date1 = new Date(order.purchaseDate);

        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Days < 7) {
          totalSaleLastSevenDays =
            totalSaleLastSevenDays + parseFloat(order.quantity);
        }
        if (Difference_In_Days < 30) {
          totalSaleLastThirtyDays =
            totalSaleLastThirtyDays + parseFloat(order.quantity);
        }
      }
    });

    const sortProducts = await Order.aggregate([
      {
        $match: {
          userID: ObjectId(userID)
        }
      },
      {
        $group: {
          _id: '$productName',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    let topProducts = [];
    for (const product of sortProducts) {
      const _product = await Inventory.findOne({
        itemName: product._id,
        userID
      });
      topProducts.push(_product);
    }

    res.status(200).json({
      status: 'success',
      dashboard: {
        ordersCount,
        revenue: revenues || null,
        totalSale: totalSale,
        totalSaleLastThirtyDays: totalSaleLastThirtyDays,
        totalSaleLastSevenDays: totalSaleLastSevenDays,
        topProducts: topProducts
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
