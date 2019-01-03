let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resolutionSchema = new Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    done: {
      type: Boolean,
      required: true,
      default: false,
      set: function(done) {
        done = done === 'true' || done === true;
        // automatically set finish date
        this.finish_date = done ? new Date() : null;
        return done;
      }
    },
    finishDate: Date,
    tags: [
      {
        type: String,
        enum: [
          'professional',
          'love',
          'personnal',
          'hobby',
          'sport',
          'academic'
        ]
      }
    ],
    type: {
      type: String,
      enum: ['countable', 'goal'],
      required: true
    },
    // countable
    count: Number,
    target: { type: Number, min: 1 }
  },
  {
    timestamps: true
  }
);

resolutionSchema.pre('validate', function(next) {
  // automatically update done
  if (this.type === 'countable') {
    // done if target reached for countable
    this.done = this.count === this.target;
  }
  next();
});

module.exports = resolutionSchema;
