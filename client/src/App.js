import React, { useState } from "react";
import "./App.css";

async function createPassword(name, password) {
  const data = {
    name,
    password,
  };
  const response = await fetch("/api/passwords/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
}

async function login() {
  const data = {
    username: "jonas",
    password: "123",
  };

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
  const [passwordName, setPasswordName] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={login}>Login</button>
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
