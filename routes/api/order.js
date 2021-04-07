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

    const order = new Order({ ...req.body, userID });
    await order.save();

    res.status(200).json({ status: 'success', order: order._doc });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
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

module.exports = router;
