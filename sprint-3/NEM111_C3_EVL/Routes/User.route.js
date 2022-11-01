const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Models/User.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/signup", (req, res) => {
  const { userId, email, password } = req.body;
  bcrypt.hash(password, 6, async (err, hash_password) => {
    if (err) {
      res.send("Signup Faild");
    } else {
      const new_user = new userModel({
        userId: userId,
        email: email,
        password: hash_password,
      });

      await new_user.save();
      res.send("Signup Successfull");
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hashed_password = user.password;

  bcrypt.compare(password, hashed_password, async (err, result) => {
    if (result) {
      var token = jwt.sign({ email: email }, "abcd1234");
      res.send({ msg: "Login Successfull", token: token });
    } else {
      res.send("Login Faild");
    }
  });
});

module.exports = {
  userRouter,
};
