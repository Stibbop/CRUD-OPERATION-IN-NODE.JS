const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const memberRoutes = require('./routes/MemberRoutes');
const userRoutes = require('./routes/UserRoutes');

app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes);

// Connect DB ONLY if not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Not Connected to MongoDB', err));

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

// EXPORT app for Jest
module.exports = app;
