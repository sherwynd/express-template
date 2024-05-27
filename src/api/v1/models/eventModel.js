const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  complexity: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventPrice: {
    type: Number,
    required: true,
  },
  activities: {
    type: [activitySchema],
    required: true,
    validate: [arrayLimit, "{PATH} exceeds the limit of 2 activities"],
  },
  participants: {
    type: Number,
    required: true,
    default: 0,
  },
  // eventImage: {
  //   type: String,
  //   required: true,
  // },
  // eventLink: {
  //   type: String,
  //   required: true,
  // },
  // eventCategory: {
  //   type: String,
  //   required: true,
  // },
  createdBy: {
    type: String,
    required: true,
  },
  subscribers: [
    {
      type: String,
      ref: "userauths",
    },
  ],
  createdDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

function arrayLimit(val) {
  return val.length <= 2;
}

module.exports = mongoose.model("event", eventSchema);
