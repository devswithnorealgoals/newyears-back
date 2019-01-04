const express = require('express');
const router = express.Router();
const UserGroup = require('../models/user-group');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  UserGroup.find({})
    .then(groups => {
      return res.json({ data: groups });
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', async (req, res, next) => {
  UserGroup.create({ creator: req.user, ...req.body })
    .then(group => {
      return res.json({ message: 'Group created', data: group });
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:user_group_id', async (req, res, next) => {
  delete req.body.creator; // don't allow creator change

  UserGroup.findOneAndUpdate({ _id: req.params.user_group_id }, req.body, {
    new: true
  })
    .then(group => {
      return res.json({ message: 'Group updated', data: group });
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:user_group_id', async (req, res, next) => {
  UserGroup.remove({ _id: req.params.user_group_id })
    .then(_ => {
      return res.json({ message: 'Group deleted' });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
