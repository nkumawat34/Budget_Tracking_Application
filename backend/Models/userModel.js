// models/user.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Adjust based on your use case
        required: true
    },
    category: {
        type: String
    }
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    transactions:
    {
        type:[transactionSchema]
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
