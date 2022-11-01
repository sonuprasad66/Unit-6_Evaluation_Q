const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: Number, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
