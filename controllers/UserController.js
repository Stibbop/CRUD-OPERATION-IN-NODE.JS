const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const { username, password, email, civil_status } = req.body;
        const user = new User({ username, password, email, civil_status });
        await user.save();
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { middlename, civil_status } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { middlename, civil_status },
            {new: true}
        );
        return res.json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};