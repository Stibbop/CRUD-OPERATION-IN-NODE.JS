const mongoose = require ('mongoose');
const Member = require('./Member'); //Import Member model for cascading delete

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:  true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    civil_Status: {
        type: String,
        required: true,
    }
});

// When a user is removed, delete all linked members
userSchema.pre('remove', async function (next) {
    await Member.deleteMany({ user: this._id });
    next();
});

// Exact Collection Name
module.exports = mongoose.model('User', userSchema, 'Users');
