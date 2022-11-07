const { Router } = require("express");
const authentication = require("../Middlewares/authetication");
const BlogModel = require("../Models/Blog.model");

const blogs = Router();

blogs.get("/", authentication, async (req, res) => {
  const { email } = req.body;
  const blogs = await BlogModel.find({ email });
  res.send({ blogs });
});

blogs.post("/create", authentication, async (req, res) => {
  const new_post = new BlogModel(req.body);
  await new_post.save();
  res.send({ msg: "blog added", new_post });
});

blogs.patch("/:id", authentication, async (req, res) => {
  const { email } = req.body;
  const blogId = req.params.id;
  await BlogModel.updateOne({ email, _id: blogId }, { $set: req.body });

  res.send({ msg: `blog with id ${blogId} has been updated` });
});

blogs.delete("/:id", authentication, async (req, res) => {
  const { email } = req.body;
  const blogId = req.params.id;
  await BlogModel.deleteOne({ email, _id: blogId });
  res.send({ msg: `blog with id ${blogId} has been deleted` });
});

module.exports = blogs;
