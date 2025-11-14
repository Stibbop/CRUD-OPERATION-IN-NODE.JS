//Import Express and MemberController
const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');

router.post('/', MemberController.createMember); // Route for Creating a Member
router.get('/:id', MemberController.getMember); // Route for Getting Member Details
router.put('/:id', MemberController.updateMember); // Route for Updating Member Details
router.delete('/:id', MemberController.deleteMember); // Route for Deleting a Member 

module.exports = router;