const { Product } = require('../../../models/api/v1/Product');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Products from DB:', products); // Log the products to debug

        res.status(200).json({ data: { products } });
    } catch (error) {
        console.error('Error getting all products:', error);
        res.status(500).json({ message: 'Internal Server Error - getAllProducts' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        const image = req.file ? req.file.path : null; // Assuming image upload is handled with multer

        const product = new Product({ 
            title, 
            description, 
            price, 
            image 
        });

        await product.save();
        res.status(201).json({ 
            data: { product } });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error - createProduct' });
    }
};

module.exports = {
    getAllProducts, createProduct
};