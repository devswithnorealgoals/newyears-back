const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userResolutionController = require('./user-resolutions.controller');

router.get('/', async (req, res, next) => {
  User.find({})
    .then(users => {
      return res.json({ data: users });
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      return res.json({ message: 'User created', data: user });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:user_id', (req, res, next) => {
  User.findOne({ _id: req.params.user_id })
    .then(user => {
      return res.json({ data: user });
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:user_id', (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.user_id }, req.body, { new: true })
    .then(user => {
      return res.json({ message: 'User updated', data: user });
    })
    .catch(err => {
      next(err);
    });
});

// resolutions
router.use('/:user_id/resolutions', userResolutionController);

module.exports = router;
