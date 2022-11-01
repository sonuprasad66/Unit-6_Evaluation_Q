const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
var jwt = require("jsonwebtoken");
const { userRouter } = require("./Routes/User.route");
const { connection } = require("./Config/db");
const { notesRouter } = require("./Routes/Notes.route");

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

app.use("/signup", userRouter);

app.use("/login", userRouter);

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  //   console.log(token);
  jwt.verify(token, "abcd1234", async (err, decoded) => {
    if (err) {
      res.send("Please Login Again");
    } else {
      next();
    }
  });
};

app.use(authenticate);

app.use("/notes", notesRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DataBase Connected Successfull");
  } catch (err) {
    console.log("Error to connect DataBase");
  }

  console.log(`App Listening on port ${process.env.PORT} `);
});
