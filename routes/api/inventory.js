const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Inventory = require('../../models/Inventory');

// @route    GET api/inventory
// @desc     Get Inventory List
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const userID = req.user.id;

    const inventoriesList = await Inventory.find({
      userID
    }).lean();

    res.status(200).json({ status: 'success', inventoriesList });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route    POST api/inventory
// @desc     POST New Inventory
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const userID = req.user.id;

    const inventory = new Inventory({ ...req.body, userID });
    await inventory.save();

    res.status(200).json({ status: 'success', inventory: inventory._doc });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.patch('/', auth, async (req, res) => {
  try {
    const inventoryID = req.query.inventoryID;

    await Inventory.updateOne({ _id: inventoryID }, req.body);

    res.status(200).json({ status: 'success', inventory: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
