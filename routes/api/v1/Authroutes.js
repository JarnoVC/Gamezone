// routes/api/v1/AuthRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../../../controllers/AuthController');

// POST /api/v1/auth/signup
router.post('/signup', AuthController.signup);

// POST /api/v1/auth/login
router.post('/login', AuthController.login);

module.exports = router;
