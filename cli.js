const inquirer = require("inquirer");
const { async } = require("rxjs");

const fs = require("fs").promises;

const CHOICE_GET = "Read a password";
const CHOICE_SET = "Set a password";

const questions = [
  {
    type: "password",
    name: "password",
    message: "What's your master password?",
  },
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [CHOICE_GET, CHOICE_SET],
  },
];

const questionsGet = [
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
];

const newQuestions = [
  {
    type: "input",
    name: "key",
    message: "Which account would like to add?",
  },
  {
    type: "password",
    name: "newPassword",
    message: "Please enter the password to your new account.",
  },
];

inquirer.prompt(questions).then(async (answersStart) => {
  if (answersStart.password === "123") {
    if (answersStart.action === CHOICE_GET) {
      inquirer.prompt(questionsGet).then(async (answersGet) => {
        try {
          const passwordsJSON = await fs.readFile("./passwords.json", "utf8");
          const passwords = JSON.parse(passwordsJSON);

          if (answersGet.key in passwords) {
            console.log(
              `Your ${answersGet.key} password is ${passwords[answersGet.key]}`
            );
          } else {
            console.log(`Your ${answersGet.key} Account does not exist.`);
          }
        } catch (error) {}
      });
    } else if (answersStart.action === CHOICE_SET) {
      inquirer.prompt(newQuestions).then(async (newAnswers) => {
        try {
          const passwordsJSON = await fs.readFile("./passwords.json", "utf8");
          const passwords = JSON.parse(passwordsJSON);
          passwords[newAnswers.key] = newAnswers.newPassword;
          const newObject = JSON.stringify(passwords);
          fs.writeFile("./passwords.json", newObject, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        } catch (error) {}
      });
    }
  } else {
    console.log("Master password is incorrect");
  }
});
