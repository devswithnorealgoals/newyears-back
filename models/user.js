let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

let resolutionSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['progression', 'accomplishement'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

let userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minlength: 6
    },
    resolutions: [resolutionSchema]
  },
  {
    timestamps: true
  }
);

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  let payload = {
    _id: this._id,
    role: this.role,
    profile_picture: this.profile_picture,
    exp: parseInt(expiry.getTime() / 1000)
  };
  delete payload.password; // Remove password hash
  return jwt.sign(payload, process.env.PASSPORT_SECRET);
};

userSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.pre('save', function(next) {
  // password
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Handle 11000 duplicate key
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'BulkWriteError' && error.code === 11000) {
    next(new Error('Duplicate user'));
  } else {
    next(error);
  }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
