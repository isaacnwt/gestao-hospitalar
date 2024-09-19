const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('./controller/userController');

router.get('/api/users', getUsers);
router.post('/api/users', createUser);

module.exports = router;