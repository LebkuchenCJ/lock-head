const readline = require("readline")


const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface.question(`What's your password?`, (password) => {
  console.log(`Your password is ${password}!`);
  interface.close();
});
