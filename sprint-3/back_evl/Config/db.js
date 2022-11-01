const mongoose = require("mongoose");
require("dotenv").config();
const connections = mongoose.connect(process.env.API_URL);

module.exports = {
  connections,
};
