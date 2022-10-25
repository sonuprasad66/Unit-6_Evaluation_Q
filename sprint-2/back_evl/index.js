const express = require("express");

const app = express();
const fs = require("fs");
app.use(express.json());

const Validator = (req, res, next) => {
  const data = req.body;
  const dataKey = ["postId", "title", "content", "author"];
  const dataType = ["number", "string", "string", "string"];

  let flag = true;
  let i = 0;

  for (let key in data) {
    if (!dataKey.includes(key) || !(typeof data[key] === dataType[i])) {
      flag = false;
      break;
    }
    i++;
  }
  if (flag && i === dataKey.length) {
    next();
  } else {
    res.send("Validator Failed");
  }
};

// const Validator = (req, res, next) => {
//   const { postId, title, content, author } = req.body;
//   if (
//     typeof postId == "number" &&
//     typeof title == "string" &&
//     typeof content == "string" &&
//     typeof author == "string"
//   ) {
//     next();
//   } else res.send("Validation Failed");
// };

const logger = (req, res, next) => {
  const { method, headers, path } = req;
  let add = `${method} ${path} ${headers["user-agent"]} ` + "\n";
  fs.appendFileSync("./log.txt", add, "utf-8");

  next();
};

app.use(logger);

app.get("/posts", (req, res) => {
  const data = fs.readFileSync("./posts.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  res.send(parseData.posts);
  console.log("get request sucessfully");
});

app.post("/posts/create", Validator, (req, res) => {
  const payload = req.body;

  const data = fs.readFileSync("./posts.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  parseData.posts.push(payload);

  fs.writeFileSync("./posts.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });
  res.send("Post sucessfully");
});

app.delete("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const data = fs.readFileSync("./posts.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  let arr = [];

  parseData.posts.forEach((item) => {
    if (item.postId != postId) {
      arr.push(item);
    }
  });
  parseData.posts = arr;
  fs.writeFileSync("./posts.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });
  res.send("delete sucessfully");
});

const guard = (req, res, next) => {
  const { password } = req.query;
  if (password == 54123) {
    // console.log("you are authorised to edit posts");
    next();
  } else {
    res.send("You are not authorised to do this operation");
  }
};
app.use(guard);

app.patch("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const payload = req.body;
  const data = fs.readFileSync("./posts.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  const fdata = parseData.posts;
  const updateData = fdata.map((item) => {
    return item.postId == postId ? { ...payload } : item;
  });
  parseData.posts = updateData;
  fs.writeFileSync("./posts.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });
  res.send("Updated Sucessfully");
});

app.listen(8080, () => {
  console.log("listening on port on 8080");
});
