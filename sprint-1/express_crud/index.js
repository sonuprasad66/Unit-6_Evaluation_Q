const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
const dns = require("dns");

app.post("/getmeip", (req, res) => {
  const url = req.body.website_name;

  dns.resolve4(url, (err, address) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(address[0]);
  });
});

app.get("/products", (req, res) => {
  const data = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  res.send(parseData.products);
  console.log("Thanks for get");
});

app.post("/products", (req, res) => {
  const data = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);

  parseData.products.push(req.body);

  fs.writeFileSync("./products.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });

  res.send("Thanks for posting");
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  let arr = [];

  parseData.products.forEach((item) => {
    if (item.id != id) {
      arr.push(item);
    }
  });
  parseData.products = arr;
  fs.writeFileSync("./products.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });

  res.send("Thanks for deleting");
});

app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const data = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);

  const products = parseData.products;

  const updateData = products.map((item) => {
    return item.id == id ? { ...payload } : item;
  });

  parseData.products = updateData;

  fs.writeFileSync("./products.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });

  res.send("Thanks for updating");
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const payload = req.body;
  const data = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parseData = JSON.parse(data);
  const products = parseData.products;

  const updateData = products.map((item) => {
    return item.id == id ? { ...payload } : item;
  });

  parseData.products = updateData;

  fs.writeFileSync("./products.json", JSON.stringify(parseData), {
    encoding: "utf-8",
  });

  res.send("Thanks for puting");
});

app.listen(8080, () => {
  console.log("Listen in port 8080 successful");
});
