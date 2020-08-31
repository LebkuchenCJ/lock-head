require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { writePassword, readPassword } = require("./lib/passwords");
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

  app.get("/api/passwords/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const password = await readPassword(name, database);
      if (!password) {
        response.status(404).send(`Password ${name} not found`);
      }
      const decryptedPassword = decrypt(password, masterPassword);
      response.status(200).send(decryptedPassword);
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  });

  app.post("/api/passwords", async (request, response) => {
    try {
      console.log("POST on /api/passwords");
      const { name, value } = request.body;
      const encryptedPassword = encrypt(value, masterPassword);
      await writePassword(name, encryptedPassword, database);
      response.status(201).send("Password created");
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  });

  app.listen(port, () => {
    console.log(`Runns on port: ${port}`);
  });
}
main();
