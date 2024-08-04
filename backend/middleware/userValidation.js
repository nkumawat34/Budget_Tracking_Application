const { body } = require('express-validator');

exports.registerValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

exports.loginValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
];
