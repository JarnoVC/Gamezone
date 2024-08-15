const { get } = require('http');
const { Order } = require('../../../models/api/v1/Order');
const { Product } = require('../../../models/api/v1/Product');

const createOrder = async (req, res) => {
    try {
      const { productId, title, description, status } = req.body;
        
        // Validate that productId, title, and description are provided
      if (!productId || !title || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const order = new Order({
        productId,
        title,
        description
      });
  
      await order.save();
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal Server Error - createOrder' });
    }
};

// Get all products
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log('Orders from DB:', orders); // Log the products to debug

        res.status(200).json({ data: { orders } });
    } catch (error) {
        console.error('Error getting all products:', error);
        res.status(500).json({ message: 'Internal Server Error - getAllProducts' });
    }
};

// Order counter
const getOrderCount = async (req, res) => {
    try {
        const count = await Order.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting order count:', error.response?.data || error.message);
        res.status(500).json({ message: 'Internal Server Error - getOrderCount' });
    }
};

// Change order status

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createOrder, getAllOrders, updateOrderStatus, getOrderCount
};