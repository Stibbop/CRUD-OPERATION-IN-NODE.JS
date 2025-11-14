const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;