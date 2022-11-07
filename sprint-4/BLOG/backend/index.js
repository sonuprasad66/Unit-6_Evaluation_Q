const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connection = require("./Config/db");
const blogsRoute = require("./Routes/blog.route");

const UserModel = require("./Models/User.model");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to Your Blogs");
});

//sign up
app.post("/signup", (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, 6, async (err, hash) => {
    if (err) return res.send({ msg: "signup failed" });
    const new_user = new UserModel({ ...req.body, password: hash });
    await new_user.save();
    res.send({ msg: "signup successful" });
  });
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send({ msg: "Invalid Credentials" });
    } else {
      let token = jwt.sign({ email: email }, "secret");
      res.send({ msg: "Login successful", token });
    }
  });
});

app.use("/blogs", blogsRoute);

app.listen(process.env.PORT || 7070, async (req, res) => {
  try {
    await connection;
    console.log("connection set with mongoDB");
  } catch (err) {
    console.log("connection with mongoDB failed");
    console.log(err);
  }
  console.log(`listening to port ${process.env.PORT}`);
});
