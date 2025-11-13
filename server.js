const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Not Connected to MongoDB', err));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
