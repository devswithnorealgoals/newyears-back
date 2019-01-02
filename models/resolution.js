let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

module.exports = resolutionSchema;
