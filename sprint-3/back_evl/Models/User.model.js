const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  email: { type: "string", require: true },
  password: { type: "string", require: true },
});

const userModel = mongoose.model("user", moduleSchema);

module.exports = {
  userModel,
};
