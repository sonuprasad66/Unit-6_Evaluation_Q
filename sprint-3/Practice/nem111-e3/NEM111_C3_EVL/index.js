const connection = require("./Config/db");
const notesRouter = require("./Routes/notes.route");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const UserModel = require("./Models/user.mode");
const e = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome home");
});

//sign up request
app.post("/signup", async (req, res) => {
  const { password } = req.body;
  bcrypt
    .hash(password, 6)
    .then(async function (hash) {
      const new_user = new UserModel({ ...req.body, password: hash });
      await new_user.save();
      res.send("sign up successful");
    })
    .catch((err) => {
      res.send("something went wrong");
    });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      const token = jwt.sign({}, "passkey");
      res.send(token);
    } else res.send("Invalid Credentials");
  });
});
// Authentication middleware
const authenticate = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[2];
  jwt.verify(token, "passkey", function (err, decoded) {
    if (err) res.send("Please Login");
    else {
      next();
    }
  });
};
app.use(authenticate);
// notes routes connected to notes collection
app.use("/notes", notesRouter);
app.listen(7070, async () => {
  try {
    await connection;
    console.log("connection is set with mongodb");
  } catch (err) {
    console.log("connection couldn't be set with mongodb");
    console.log(err);
  }
  console.log("sever has started at port 7070");
});
