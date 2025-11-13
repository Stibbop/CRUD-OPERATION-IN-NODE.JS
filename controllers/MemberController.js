const { get } = require("mongoose");

const Member = required('../models/Member'); //Importing Member Model

//Function for Creation of Member
const createMember = async (req, res) => {
    try {
        const { firstname, lastname, email, userId} = req.body;
        const memberData = { firstname, lastname, email}
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




//Exporting functions inside this controller
module.exports = {
    createMember,
    getMember,
}