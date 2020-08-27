require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL);
const port = 3000;

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const quotesCollection = database.collection("quotes");

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
  });
  app.post("/quotes", (request, response) => {
    quotesCollection
      .insertOne(request.body)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  });

  app.listen(port, () => {
    console.log(`Ready. App is listening on http://localhost:${port}`);
  });
}
main();
