const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../models/user');

const publicUrls = ['/api/v1/auth/sign_in'];

function initialize(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload._id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
}

function middleware(req, res, next) {
  // Protects all routes by default, except those in publicUrls
  if (publicUrls.includes(req.path)) {
    return next();
  }
  return passport.authenticate('jwt', {
    session: false
  })(req, res, next);
}

module.exports = { initialize, middleware };
