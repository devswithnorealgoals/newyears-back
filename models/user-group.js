let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const User = require('./user');

let userGroupSchema = new Schema(
  {
    name: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);

let UserGroup = mongoose.model('UserGroup', userGroupSchema);

module.exports = UserGroup;
