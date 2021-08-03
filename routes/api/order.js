const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Order = require('../../models/Order');

router.get('/', auth, async (req, res) => {
  try {
    const userID = req.user.id;

    const ordersList = await Order.find({
      userID
    }).lean();

    res.status(200).json({ status: 'success', ordersList });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    console.log(req.body.inventories);
    for (const inventory of req.body.inventories) {
      if (inventory.isChecked) {
        const order = new Order({
          productName: inventory.itemName,
          customerName: inventory.customerName,
          customerAddress: inventory.customerAddress,
          customerNumber: inventory.customerNumber,
          Price: inventory.Price,
          quantity: inventory.quantity,
          userID: userID,
          purchaseDate: Date.now()
        });
        await order.save();
      }
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch('/', auth, async (req, res) => {
  try {
    const orderID = req.query.orderID;

    await Order.updateOne({ _id: orderID }, req.body);

    res.status(200).json({ status: 'success', order: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const orderID = req.query.orderID;
    const order = await Order.findOneAndDelete({
      _id: orderID
    });

    res.status(200).json({ status: 'success', order: order });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
