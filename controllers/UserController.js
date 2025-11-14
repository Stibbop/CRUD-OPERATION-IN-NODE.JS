const User = require('../models/User');

// Creating of Users
const createUser = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, civil_Status } = req.body;
        const user = new User({ firstName, middleName, lastName, email, civil_Status });
        await user.save();
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Getting User's Details
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Updating User's Details middlename and civil status
const updateUser = async (req, res) => {
    try {
        const { middleName, civil_Status } = req.body;
        const updateData = {};
        if (middleName) updateData.middleName = middleName;
        if (civil_Status) updateData.civil_Status = civil_Status;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Deletion of Users
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.remove();
        return res.json({ message: 'User and their members deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}