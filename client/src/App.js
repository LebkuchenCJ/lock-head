import React, { useState } from "react";
import "./App.css";

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

async function getPasswords() {
  const response = await fetch("/api/passwords/kebab");
  const result = await response.text();
  alert(result);
}
function App() {
  const [passwordName, setPasswordName] = useState("");
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
      </header>
    </div>
  );
}

export default App;
