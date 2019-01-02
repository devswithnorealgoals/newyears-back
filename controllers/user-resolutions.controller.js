const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({ data: req.user.resolutions });
});

router.post('/', (req, res, next) => {
  req.user.resolutions.push(req.body);
  req.user
    .save()
    .then(user => {
      return res.json({ message: 'Resolution created', data: user });
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:resolution_id', (req, res, next) => {
  let resolution = req.user.resolutions.id(req.params.resolution_id);
  resolution = Object.assign(resolution, req.body);
  req.user
    .save()
    .then(user => {
      return res.json({ message: 'Resolution updated', data: user });
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:resolution_id', (req, res, next) => {
  req.user.resolutions.id(req.params.resolution_id).remove();

  req.user
    .save()
    .then(user => {
      return res.json({ message: 'Resolution removed', data: user });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
