const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Item = require('../models/item');
const Customer = require('../models/customer');
const DeliveryVehicle = require('../models/deliveryVehicle');

function generateOrderNumber() {
  lastOrderNumber++;
  const paddedOrderNumber = lastOrderNumber.toString().padStart(4, '0');
  return paddedOrderNumber;
}

// Create an order
router.post('/create', async (req, res) => {
  try {

    // Finding customer by name and city or create new
    const { name, city } = req.body;
    let customerFound = await Customer.findOne({ name, city });
    if (!customerFound) {
      customerFound = new Customer({ name, city });
      await customerFound.save();
    }

     // if customer's city and delivery vehicle's city and 
    const customer = await Customer.findById(req.body.customerId);
    const deliveryVehicle = await DeliveryVehicle.findOne({ city: customer.city });

    if (!customer || !deliveryVehicle) {
      return res.status(400).json('Invalid customer or no suitable delivery vehicle available.');
    }

    if (deliveryVehicle.activeOrdersCount >= 2) {
      return res.status(400).json('Delivery vehicle cannot take more orders.');
    }

    const item = await Item.findById(req.body.itemId);
    if (!item) {
      return res.status(404).json('Item not found.');
    }

    const newOrder = new Order({
      orderNumber: generateOrderNumber(),
      itemId: item._id,
      price: item.price,
      customerId: customer._id,
      deliveryVehicleId: deliveryVehicle._id,
    });
    lastOrderNumber = orderNumber;
    await newOrder.save();

    deliveryVehicle.activeOrdersCount += 1;
    await deliveryVehicle.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Order delivered API
router.post('/deliver/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json('Order not found.');
    }

    order.isDelivered = true;
    await order.save();

    const deliveryVehicle = await DeliveryVehicle.findById(order.deliveryVehicleId);
    if (deliveryVehicle) {
      deliveryVehicle.activeOrdersCount -= 1;
      await deliveryVehicle.save();
    }

    return res.status(200).json('Order delivered.');
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;