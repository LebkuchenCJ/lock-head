import React, { useState } from "react";
import "./App.css";

async function createPassword(name, value) {
  const data = {
    name,
    value,
  };
  console.log(data);

  const response = await fetch("/api/passwords/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  const result = await response.text();
  alert(result);
}

async function login(userName, userPassword) {
  const data = {
    username: userName,
    password: userPassword,
  };
  sessionStorage.setItem(`${userName}`, `${userPassword}`);

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  const result = await response.text();
  alert(result);
}

async function getPasswords(name) {
  const response = await fetch(`/api/passwords/${name}`);
  const result = await response.text();
  alert(result);
}
function App() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordName, setPasswordName] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <label>
          <input
            placeholder="Enter user name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            placeholder="Enter user password"
            value={userPassword}
            type="password"
            onChange={(event) => setUserPassword(event.target.value)}
          />
        </label>
        <button onClick={() => login(userName, userPassword)}>Login</button>
        <label>
          <input
            value={passwordName}
            onChange={(event) => setPasswordName(event.target.value)}
          />
        </label>
        <button onClick={() => getPasswords(passwordName)}>Get Password</button>
        <label>
          <input
            value={passwordName}
            placeholder="Enter account name"
            onChange={(event) => setPasswordName(event.target.value)}
          />
          <input
            value={passwordValue}
            placeholder="Enter password"
            type="password"
            onChange={(event) => setPasswordValue(event.target.value)}
          />
        </label>
        <button onClick={() => createPassword(passwordName, passwordValue)}>
          Create Password
        </button>
      </header>
    </div>
  );
}

export default App;
