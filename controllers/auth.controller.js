const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/sign_in', function(req, res, next) {
  User.findOne({
    email: req.body.email
  })
    .select('+password')
    .exec(function(err, user) {
      if (err) return next(err);

      if (!user) {
        let err = new Error('User not found');
        err.statusCode = 404;
        return next(err);
      }

      // check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) next(err);
        if (!isMatch) {
          let err = new Error('Wrong password');
          err.statusCode = 400;
          return next(err);
        }

        // if user is found and password is right create a token
        var token = user.generateJwt();
        // return the information including token as JSON
        res.json({
          message: 'Signed in',
          data: { token: token }
        });
      });
    });
});

module.exports = router;
