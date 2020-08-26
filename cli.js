const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const { readPassword, writePassword } = require("./lib/passwords");
const { encrypt, decrypt } = require("./lib/crypto");

async function main() {
  const { masterPassword, action } = await askStartQuestions();

  if (masterPassword === "123") {
    console.log("Master Password is correct!");
    if (action === CHOICE_GET) {
      console.log("Now Get a password");
      const { key } = await askGetPasswordQuestions();
      try {
        const encryptedPassword = await readPassword(key);
        const password = decrypt(encryptedPassword, masterPassword);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong 😑");
        // What to do now?
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      try {
      const { key, password } = await askSetPasswordQuestions();
      const encryptedPassword = encrypt(password, masterPassword);
      await writePassword(key, encryptedPassword);
      console.log(`Password for ${key} is set.`);
    } catch (error) {
      console.error("Something went wrong 😑");
      // What to do now?
    }
  } else {
    console.log("Master Password is incorrect!");
  }
}

main();

/* try {
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
 */
/* const inquirer = require("inquirer");
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
 */
