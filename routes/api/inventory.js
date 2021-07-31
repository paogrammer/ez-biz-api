const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');

const Inventory = require('../../models/Inventory');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage });

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
router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    const userID = req.user.id;

    const inventory = new Inventory({
      ...req.body,
      userID,
      photo: req.file ? req.file.path : null
    });
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

router.delete('/', auth, async (req, res) => {
  try {
    const inventoryID = req.query.inventoryID;
    const inventory = await Inventory.findOneAndDelete({
      _id: inventoryID
    });

    res.status(200).json({ status: 'success', inventory: inventory });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
