const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); // Adjust the path as necessary

// Create a new transaction for a specific user
router.post('/users/:userId/transactions', transactionController.createTransaction);

// Get all transactions for a specific user
router.get('/users/:userId/transactions', transactionController.getAllTransactions);

// Get a single transaction by ID for a specific user
router.get('/users/:userId/transactions/:transactionId', transactionController.getTransactionById);

// Update a transaction for a specific user
router.put('/users/:userId/transactions/:transactionId', transactionController.updateTransaction);

// Delete a transaction for a specific user
router.delete('/users/:userId/transactions/:transactionId', transactionController.deleteTransaction);

module.exports = router;
