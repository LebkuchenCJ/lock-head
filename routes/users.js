const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

function createUsersRouter(database) {
  const userCollection = database.collection("users");
  router.get("/", (request, response) => {
    response.send("Huhu");
  });

  router.post("/login", async (request, response) => {
    const { username, password } = request.body;
    console.log(username, password);
    response.send("Logged In");
  });

  return router;
}
module.exports = createUsersRouter;
