const inquirer = require("inquirer");
const { async } = require("rxjs");

const fs = require("fs").promises;

const questions = [
  {
    type: "password",
    name: "password",
    message: "What's your master password?",
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  if (answers.password === "123") {
    try {
      const passwordsJSON = await fs.readFile("./passwords.json", "utf8");
      const passwords = JSON.parse(passwordsJSON);
      console.log(`Your ${answers.key} password is ${passwords[answers.key]}`);
    } catch (error) {}
  } else {
    console.log("Master password is incorrect");
  }
});
