const { get } = require("mongoose");

const Member = require('../models/Member'); //Importing Member Model

//Function for Creation of Member
const createMember = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, civilStatus, userId} = req.body;
        const memberData = { firstName, middleName, lastName, email, civilStatus}
        if (userId) {
            memberData.user = userId;
        }
        const member = new Member(memberData);
        await member.save();
        return res.json(member);
    }
    catch (err){
        return res.status(500).json({error: err.message});
    }
};

//Function for Getting All Member Details
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find().populate();
        return res.json(members);
    }
    catch (err) {
        return res.status(500).json({error: err.message});
    }
}

//Function for Getting A Member Details
const getMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id).populate('user');
        if (!member) return res.status(404).json({error: 'Member not found'});
        return res.json(member);
    }
    catch (err){
        return res.status(500).json({error: err.message});
    }
};

//Function for Updating Member Details
const updateMember = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, civilStatus, userId} = req.body;
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (email) updateData.email = email;
        if (userId) updateData.user = userId;
        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id, updateData, { new: true});
        if (!updatedMember) return res.status(404).json({ error: 'Member not found' });
        return res.json(updatedMember);
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
}

//Function for Deleting a Member
const deleteMember = async (req, res) => {
    try{
        const deletedMember = await Member.findByIdAndDelete(req.params.id);
        if (!deletedMember) return res.status(404).json({ error: 'Member not found'});
        return res.json({ message: 'Member deleted successfully'});
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
}

//Get Members of a User
const getMembersByUser = async (req, res) => {
    try {
        const members = await Member.find({user: req.params.userId}).populate('user');
        res.json(members);
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
}



//Exporting functions inside this controller
module.exports = {
    createMember,
    getAllMembers,
    getMembersByUser,
    getMember,
    updateMember,
    deleteMember,
}