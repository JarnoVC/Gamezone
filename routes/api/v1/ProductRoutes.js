const express = require('express')
const ProductController = require('../../../controllers/api/v1/ProductController')
const router = express.Router()

// GET all users
router.get('/', ProductController.getAllProducts)
// POST new product
router.post('/', ProductController.createProduct);

module.exports = router;