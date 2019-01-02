let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resolutionSchema = new Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    status: {
      type: String,
      require: true,
      enum: ['planned', 'in progress', 'done']
    },
    tags: [
      {
        type: String,
        enum: ['pro', 'love', 'fun', 'sport']
      }
    ],
    type: {
      type: String,
      enum: ['tracking', 'accomplishement', 'goal'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// todo: automatically update status based on progression
// resolutionSchema.pre('validate', function(next) {
//   // if (this.name !== 'Woody') this.name = 'Woody';
//   next();
// });

module.exports = resolutionSchema;
