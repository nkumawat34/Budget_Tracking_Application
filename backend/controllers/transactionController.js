

const User = require('../Models/userModel');

exports.createTransaction = async (req, res) => {
    try {
      const { userId } = req.params; // Extract userId from the URL parameters
        const { date,title, amount, type, category } = req.body;

     
      const amount1=parseInt(amount)
      
      const newTransaction = {
       date,title,amount,type,category
      };
      
       // Find user by email and update transactions
       
       const user = await User.findOneAndUpdate(
        { email: userId }, // Find user by email
        { $push: { transactions: newTransaction } }, // Add new transaction
        { new: true} // Return updated user and run validators
    );
    if (!User) return res.status(404).json({ error: 'User not found' });

    // Respond with the newly added transaction
    res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// services/userService.js
exports.getAllTransactions = async (req, res) => {
  try {
      const { userId } = req.params;
      console.log(userId)
      // Find the user by ID
     const user = await User.findOne({ email:userId });
      //if (!user) return res.status(404).json({ error: 'User not found' });
      console.log(user)
      //Respond with all transactions for the user
      res.status(200).json(user.transactions);
  } catch (error) {
      // Handle any errors that occur
      res.status(400).json({ error: error.message });
  }
};



// services/userService.js
exports.getTransactionById = async (req, res) => {
  try {
      const { userId, transactionId } = req.params;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      const transaction = user.transactions.id(transactionId);
      if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

      res.status(200).json(transaction);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


exports.updateTransaction = async (req, res) => {
  try {
    const { userId, transactionId } = req.params; // Extract email (userId) and transactionId from URL parameters
    const { date, title, amount, type, category } = req.body; // Extract new transaction details from the request body

    // Find and update the transaction within the user's transactions array
    const user = await User.findOneAndUpdate(
      { email: userId, 'transactions._id': transactionId }, // Find user by email and transaction by ID
      { 
        $set: {
          'transactions.$.date': date,
          'transactions.$.title': title,
          'transactions.$.amount': amount,
          'transactions.$.type': type,
          'transactions.$.category': category
        }
      },
      { new: true } // Return the updated document
    );
    
    if (!user) return res.status(404).json({ error: 'User or Transaction not found' });

    res.status(200).json({ message: 'Transaction updated successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// services/userService.js
exports.deleteTransaction = async (req, res) => {
  try {
      const { userId, transactionId } = req.params;

      const user = await User.findOne({ email:userId });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const result = await User.updateOne(
        { email: userId }, // Find the user by email
        { $pull: { transactions: { _id: transactionId } } } // Remove the transaction from the transactions array
      );
  
      if (result.nModified === 0) return res.status(404).json({ error: 'Transaction not found or already deleted' });
  
      // Respond with a success message
      res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

