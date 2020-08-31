const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const { response } = require("express");

function createUsersRouter(database, masterPassword) {
  const userCollection = database.collection("users");
  router.get("/", (request, response) => {
    response.send("Huhu");
  });

  router.post("/login", async (request, response) => {
    try {
      const { username, password } = request.body;
      const user = await userCollection.findOne({
        username,
        password,
      });
      if (!user) {
        response.status(401).send("Wrong email or password");
        return;
      }
      const token = jwt.sign({ username }, masterPassword, {
        expiresIn: "360s",
      });
      console.log(token);

      response.send("Logged In");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });
  return router;
}
module.exports = createUsersRouter;
