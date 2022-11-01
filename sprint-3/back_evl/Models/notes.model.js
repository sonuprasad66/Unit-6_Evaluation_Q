const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  heading: { type: String, require: true },
  note: { type: String, require: true },
  tag: { type: String, require: true },
});

const notesModel = mongoose.model("note", moduleSchema);

module.exports = {
  notesModel,
};
