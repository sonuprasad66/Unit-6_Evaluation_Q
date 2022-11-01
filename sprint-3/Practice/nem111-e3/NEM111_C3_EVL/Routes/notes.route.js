const { Router } = require("express");
const NoteModel = require("../Models/notes.model");

const notes = Router();

notes.get("/", async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];

  let allNotes = await NoteModel.find({ userId: +userId });
  res.send(allNotes);
});

const validate = (req, res, next) => {
  const { heading, note, tag } = req.body;
  if (heading && note && tag) {
    next();
  } else res.send("data insufficient");
};
notes.post("/create", validate, async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];
  const new_note = new NoteModel({ ...req.body, userId: +userId });
  await new_note.save();

  res.send(new_note);
});

notes.patch("/:noteId", async (req, res) => {
  const noteId = +req.params.noteId;

  // console.log()
  const userId = +req.headers.authorization.split(" ")[1];
  // let allNotes=await NoteModel.find();
  await NoteModel.updateOne({ noteId, userId }, { $set: req.body });
  res.send(
    `the note of UserId ${userId} and note with ID ${noteId} has been updated`
  );
});

notes.delete("/:noteId", async (req, res) => {
  const noteId = +req.params.noteId;

  // console.log()
  const userId = +req.headers.authorization.split(" ")[1];
  // let allNotes=await NoteModel.find();
  await NoteModel.deleteOne({ noteId, userId });
  res.send(
    `the note of UserId ${userId} and note with ID ${noteId} has been deleted`
  );
});

module.exports = notes;
