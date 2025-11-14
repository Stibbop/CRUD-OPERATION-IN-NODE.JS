const { get } = require("mongoose");

const Member = required('../models/Member'); //Importing Member Model

//Function for Creation of Member
const createMember = async (req, res) => {
    try {
        const { firstname, lastname, email, civil_status, userId} = req.body;
        const memberData = { firstname, lastname, email, civil_status}
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

//Function for Getting Member Details
const getMember = async (req, res) => {
    try {
        const member = await Member.findbyId(req.params.id).populate('user');
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
        const { firstname, lastname, email, civil_status} = req.body;
        const updateData = {};
        if (firstname) updateData.firstname = firstname;
        if (email) updateData.email = email;
        if (userId !== undefined) updateData.user = userId;

        const updatedMember = await Member.findbyIdandUpdate(
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
        const deletedMember = await Member.findbyIdandDelete(req.params.id);
        if (!deletedMember) return res.status(404).json({ error: 'Member not found'});
        return res.json({ message: 'Member deleted successfully'});
    }
    catch (err) {
        res.status(500).json({ error: err.message});
    }
}



//Exporting functions inside this controller
module.exports = {
    createMember,
    getMember,
    updateMember,
    deleteMember,
}