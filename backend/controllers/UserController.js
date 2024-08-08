const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY
// Register User
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
     //   if (user) {
       //     return res.status(400).json({ msg: 'User already exists' });
        //}

        // Create a new user
        user = new User({
            email,
            password,
            transactions: [] // Initialize transactions array
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '7d' });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login User
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        console.log("Hi")
        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '7d' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
