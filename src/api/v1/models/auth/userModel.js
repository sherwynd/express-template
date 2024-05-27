const mongoose = require("mongoose");
//auth Controller will handle login and signup
const userLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  description: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  refId: {
    type: String,
    required: true,
  },
  eventSubscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  createdDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  favourites: {
    type: [String],
    default: []
  },
});

module.exports = mongoose.model("userauths", userLoginSchema);
