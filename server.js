const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
const memberRoutes = require('./routes/MemberRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Not Connected to MongoDB', err));

//Starting of Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
