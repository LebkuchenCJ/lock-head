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

async function writePassword(key, value, database) {
  const collection = database.collection("passwords");
  await collection.inserOne({
    name: key,
    value: value,
  });
}

async function readMasterPassword() {
  try {
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
  } catch (error) {
    return null;
  }
}

async function writeMasterPassword(masterPassword) {
  await fs.writeFile("./masterPassword", masterPassword);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.readMasterPassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;
