const express = require("express");
require("dotenv").config();
const app = express();
const { connections } = require("./Config/db");
const { userRouter } = require("./Routes/User.route");
const { noteRouter } = require("./Routes/notes.route");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/signup", userRouter);

app.use("/login", userRouter);

app.use("/notes", noteRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connections;
    console.log("Mongoose DB connected Successfully");
  } catch (err) {
    console.log("Error to connect database");
    console.log(err);
  }
  console.log("App listening on Port 8001");
});
