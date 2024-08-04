const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const { registerValidation, loginValidation } = require('../middleware/userValidation');

// Register route
router.post('/register', registerValidation, register);

// Login route
router.post('/login', loginValidation, login);

module.exports = router;
