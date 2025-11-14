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

// Getting All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate();
        return res.json(users);
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
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        return res.json({ message: 'User and their members deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get List of Members for a User
const getMembersForUser = async (req, res) => {
    try {
    const { userId } = req.params;
        const members = await Member.find({ user: userId });
        if (members.length === 0) {
            return res.status(404).json({ message: 'No members found for this user' });
        }
        return res.json(members);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete a member under 


module.exports = {
    createUser,
    getAllUsers,
    getMembersForUser,
    getUser,
    updateUser,
    deleteUser
}