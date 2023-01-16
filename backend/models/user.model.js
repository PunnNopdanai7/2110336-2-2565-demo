const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please add a username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please add a password"],
    minLength: 6,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
