const express = require('express');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');
const userGroupController = require('./controllers/user-group.controller');

const router = express.Router();

router.use('/auth', authController);
router.use('/users', userController);
router.use('/groups', userGroupController);

module.exports = router;
