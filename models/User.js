const mongoose = require ('mongoose');

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
    }
});

userSchema.pre('remove', async function (next) {
    await Member.deleteMany({ userId: this._id });
    next();
});

module.exports = mongoose.model('User', userSchema, 'Users');
