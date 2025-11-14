//Import Express and MemberController
const express = require('express');
const router = express.Router();
const MemberController = required('../controllers/MemberController');

router.post('/members', MemberController.createMember); // Route for Creating a Member
router.get('/members/:id', MemberController.getMember); // Route for Getting Member Details
router.put('/members/:id', MemberController.updateMember); // Route for Updating Member Details
router.delete('/members/:id', MemberController.deleteMember); // Route for Deleting a Member 

module.exports = router;