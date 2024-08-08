const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); // Adjust the path as necessary
const authenticateJWT = require('../middleware/authmiddleware');
// Create a new transaction for a specific user
router.post('/users/:userId/transactions',authenticateJWT,transactionController.createTransaction);

// Get all transactions for a specific user
router.get('/users/:userId/transactions',authenticateJWT,transactionController.getAllTransactions);

// Get a single transaction by ID for a specific user
router.get('/users/:userId/transactions/:transactionId',authenticateJWT, transactionController.getTransactionById);

// Update a transaction for a specific user
router.put('/users/:userId/transactions/:transactionId',authenticateJWT, transactionController.updateTransaction);

// Delete a transaction for a specific user
router.delete('/users/:userId/transactions/:transactionId',authenticateJWT, transactionController.deleteTransaction);

module.exports = router;
