require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { writePassword } = require("./lib/passwords");
const { encrypt, decrypt } = require("./lib/crypto");

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

const port = 3000;

async function main() {
  await client.connect();

  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.post("/api/passwords", async (request, response) => {
    console.log("POST on /api/passwords");
    const { name, value } = request.body;
    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.status(201).send("Password created");
  });

  app.listen(port, () => {
    console.log(`Runns on port: ${port}`);
  });
}
main();
