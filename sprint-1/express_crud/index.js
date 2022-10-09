const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get("/products", (req, res) => {
  const data = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  res.send(parseData.products);
});

app.post("/products", (req, res) => {
  const data = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  parseData.products.push(req.body);
  fs.writeFileSync("./products.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });
  res.send("posting sucessfull");
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(`./products.json`, { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  let arr = [];
  parseData.products.forEach((item) => {
    if (item.id != id) {
      arr.push(item);
    }
  });
  //   console.log(arr);
  parseData.products = arr;

  fs.writeFileSync("./products.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });
  res.send("deleting sucessfull");
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(`./products.json`, { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  const newData = req.body;
  parseData.products.map((item) => {
    item.id === id ? { ...item, newData } : item;
  });
  fs.writeFileSync("./products.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });

  res.send("put request sucessfull");
});

app.listen(8080, () => {
  console.log("Listen in port 8080 successful");
});
