const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Models/User.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

userRouter.use(express.json());

userRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 5, async (err, hash_password) => {
    if (err) {
      res.send("Somthing Went Wroong");
    } else {
      const new_user = new userModel({
        email: email,
        password: hash_password,
      });
      await new_user.save();
      res.send("SignUp Sucessfull");
    }
  });
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hashed_password = user.password;
  bcrypt.compare(password, hashed_password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: email }, "abcd1234", { expiresIn: "1h" });
      res.send({ msg: "Login successfull", token: token });
    } else {
      res.send("Login Faild");
    }
  });
});
module.exports = {
  userRouter,
};
