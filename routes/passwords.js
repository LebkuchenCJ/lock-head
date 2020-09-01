const express = require("express");
const router = express.Router();

const { encrypt, decrypt } = require("../lib/crypto");
const { writePassword, readPassword } = require("../lib/passwords");
const jwt = require("jsonwebtoken");

function createPasswordsRouter(database, masterPassword) {
  router.use((request, response, next) => {
    try {
      const { authToken } = request.cookies;
      const { username } = jwt.verify(authToken, masterPassword);
      console.log(`Allow accedd to ${username}`);
      next();
    } catch (error) {
      response.status(401).send("Access denied.");
    }
  });

  router.get("/", async (request, response) => {
    response.send("Rest a bit");
  });

  router.get("/:name", async (request, response) => {
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

  router.post("/", async (request, response) => {
    try {
      console.log("POST on /api/passwords");
      const { name, value } = request.body;
      const encryptedPassword = encrypt(value, masterPassword);
      const password = await readPassword(name, database);

      if (password) {
        response.status(409).send(`Password ${name} is already declared.`);
        return;
      }

      await writePassword(name, encryptedPassword, database);
      response.status(201).send("Password created");
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  });

  router.patch("/:name", async (request, response) => {
    const { name } = request.params;
    const password = await readPassword(name, database);
    if (!password) {
      response.status(404).send(`Password ${name} not found`);
    }

    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.status(201).send(`Password for ${name} updated.`);
  });

  return router;
}
module.exports = createPasswordsRouter;
