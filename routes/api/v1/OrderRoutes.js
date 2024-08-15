const express = require('express')
const router = express.Router()
const OrderController = require('../../../controllers/api/v1/OrderController');

// Post a new entry to order file
router.post('/', OrderController.createOrder);

// GET all Orders
router.get('/', OrderController.getAllOrders);

// Route to update order status
router.put('/:id/status', OrderController.updateOrderStatus);

// Get order count
router.get('/count', OrderController.getOrderCount);

module.exports = router;