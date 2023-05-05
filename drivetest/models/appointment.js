const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointSchema = new Schema(
  {
    date: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    isTimeSlotAvailable: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', appointSchema);
