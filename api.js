const express = require('express');
const userController = require('./controllers/user.controller');

const router = express.Router();

router.use('/users', userController);

module.exports = router