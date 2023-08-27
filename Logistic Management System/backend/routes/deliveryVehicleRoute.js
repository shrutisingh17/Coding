const express = require('express');
const router = express.Router();
const DeliveryVehicle = require('../models/deliveryVehicle');

// Creating a new delivery vehicle
router.post("/", async (req, res) => {
  try {
    const newVehicle = new DeliveryVehicle(req.body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create delivery vehicle." });
  }
});

// Reading all delivery vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await DeliveryVehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve delivery vehicles." });
  }
});

// Updating vehicle's information
router.put("/:id", async (req, res) => {
  try {
    const vehicle = await DeliveryVehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update delivery vehicle." });
  }
});

module.exports = router;