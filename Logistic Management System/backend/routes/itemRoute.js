const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Creating a new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item.' });
  }
});

// Geting all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve items.' });
  }
});

// Updating an item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
      },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item.' });
  }
});

module.exports = router;

