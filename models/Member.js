const mongoose = require('mongoose'); //Import Mongoose

//Creation of Member Schema
const memberSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

//Exporting Member Model
module.exports = mongoose.model('Member', memberSchema, 'Members');