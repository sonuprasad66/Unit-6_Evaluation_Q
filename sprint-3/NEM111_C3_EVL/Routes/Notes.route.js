const express = require("express");
const notesRouter = express.Router();
const { notesModel } = require("../Models/Notes.model");

notesRouter.get("/", (req, res) => {
  res.send("Notes Page");
});

const validation = (req, res, next) => {
  const { title, note, tag } = req.body;
  if (title && note && tag) {
    next();
  } else {
    res.send("Data insufficient");
  }
};

// validation

notesRouter.post("/create", validation, async (req, res) => {
  const userId = req.headers.authorization;
  console.log(userId);
  console.log(req.body);
  const new_note = new notesModel({
    ...req.body,
  });
  await new_note.save();
  res.send(new_note);
});

notesRouter.patch("/:noteId", async (req, res) => {
  const { noteId } = +req.params;
  const userId = req.query;
  await notesModel.updateOne({ noteId, userId }, { $set: req.body });
  res.send(`The userId ${userId} and notesId ${noteId} has been updated`);
});

notesRouter.delete("/:noteId", async (req, res) => {
  const { noteId } = +req.params;
  const userId = req.query;
  await notesModel.deleteOne({ noteId: noteId });
  res.send(`The userId ${userId} and notesId ${noteId} has been deleted`);
});

module.exports = {
  notesRouter,
};
