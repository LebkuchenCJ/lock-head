const fs = require("fs").promises;

async function readPasswords() {
  const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
}

async function readPassword(key) {
  const passwords = await readPasswords();
  const password = passwords[key];
  return password;
}

async function writePassword(key, value) {
  const passwords = await readPasswords();
  passwords[key] = value;
  const newObject = JSON.stringify(passwords, null, 2);
  await fs.writeFile("./passwords.json", newObject);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
