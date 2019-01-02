const express = require('express');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');

const router = express.Router();

router.use('/auth', authController);
router.use('/users', userController);

module.exports = router;
