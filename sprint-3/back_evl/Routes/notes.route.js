const express = require("express");
const noteRouter = express.Router();
var jwt = require("jsonwebtoken");

noteRouter.get("/notes", async (req, res) => {
  const { token } = req.query;
  try {
    var decoded = await jwt.verify(token, "abcd1234");
    const { email } = decoded;
    res.send(`Hi ${email} Here your priveta Data`);
  } catch (err) {
    res.send("Please Login Again");
    console.log(err);
  }
});


module.exports = {
  noteRouter,
};
