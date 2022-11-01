const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  userId: Number,
  noteId: Number,
  title: { type: String, require: true },
  note: { type: String, require: true },
  tag: { type: String, require: true },
});

const notesModel = mongoose.model("note", notesSchema);

module.exports = {
  notesModel,
};
