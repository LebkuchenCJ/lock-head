require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const createPasswordsRouter = require("./routes/passwords");
const createUsersRouter = require("./routes/users");

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());
app.use((request, response, next) => {
  console.log(`Request ${request.method} on ${request.url}`);
  next();
});

const port = 3000;

async function main() {
  await client.connect();

  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.use("/api/passwords", createPasswordsRouter(database, masterPassword));
  app.use("/api/users", createUsersRouter(database, masterPassword));

  app.listen(port, () => {
    console.log(`Runns on port: ${port}`);
  });
}
main();
