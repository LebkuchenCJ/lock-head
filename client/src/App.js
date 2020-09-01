import React from "react";
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
  console.log(result);
  return result;
}
function App() {
  async function getPasswords() {
    await login();
    const response = await fetch("/api/passwords/kebab");
    const result = await response.json();
    console.log(result);
    return result;
  }
  getPasswords();

  return (
    <div className="App">
      <header className="App-header">
        <p>TEST</p>
      </header>
    </div>
  );
}

export default App;
