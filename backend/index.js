const express = require('express')
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const transactionRoutes=require('./routes/transactionRoutes')
const app = express()
const port = 3001
const cors=require('cors')
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})