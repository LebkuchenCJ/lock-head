const express = require("express");
//const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.listen(port, function () {
  console.log(`listening on ${port}`);
});

app.get("/", (req, res) => {});

app.post("/quotes", (req, res) => {
  console.log("Hellooooooooooooooooo!");
});
