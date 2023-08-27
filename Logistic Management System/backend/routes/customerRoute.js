const express = require('express');
const router = express.Router();
const Customer = require('../models/customer'); // Adjust the path based on your file structure

// Create a new customer
router.post('/', async (req, res) => {
    try {
        const { name, city } = req.body;

        const newCustomer = new Customer({
            name,
            city,
        });

        const savedCustomer = await newCustomer.save();

        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer.' });
    }
});

module.exports = router;
