const express = require('express')
const userController = require('../../../controllers/api/v1/UserController')
const router = express.Router()

// GET all users
router.get('/', userController.getAllUsers)

module.exports = router;