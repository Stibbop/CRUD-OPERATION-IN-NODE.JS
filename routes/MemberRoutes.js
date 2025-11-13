//Import Express and MemberController
const express = require('express');
const router = express.Router();
const MemberController = required('../controllers/MemberController');

router.post('/members', MemberController.createMember); // Route for Creating a Member

module.exports = router;