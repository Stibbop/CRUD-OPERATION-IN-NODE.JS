const mongoose = require ('mongoose');
const Member = require('./Member'); //Import Member model for cascading delete

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:  true,
    },
    middlename: {
        type: String,
        required: false,
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
    civil_status: {
        type: String,
        required: true,
    }
});

// When a user is removed, delete all linked members
userSchema.pre('remove', async function (next) {
    await Member.deleteMany({ userId: this._id });
    next();
});

// Exact Collection Name
module.exports = mongoose.model('User', userSchema, 'Users');
