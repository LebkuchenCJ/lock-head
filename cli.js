const inquirer = require("inquirer");

const questions = [
  {
    type: "password",
    name: "password",
    message: "Whats your password?",
  },
  {
    type: "input",
    name: "name",
    message: "Whats your name?",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Your password is ${answers.password}!`);
  console.log(`Your name is ${answers.name}!`);
});
