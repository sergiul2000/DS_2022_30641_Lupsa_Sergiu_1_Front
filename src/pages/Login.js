import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Input from "reactstrap/lib/Input";
// import { redirect } from "react-router-dom";
// import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const butonLogin = (e) => {
    e.preventDefault();
    const user = { username, password };
    console.log("username= " + username);
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log(Response.role);
        localStorage.setItem("id", JSON.stringify(Response.id));
        localStorage.setItem("username", JSON.stringify(Response.username));
        localStorage.setItem("role", JSON.stringify(Response.role));
        if (Response.role == 1) {
          // return <Link to="/client" />;
          navigate("/client");
          // return <Navigate to="/client" />;
          // redirect("/client");
        } else {
          if (Response.role == 2) {
            // return <Link to="/client" />;
            navigate("/admin");
            // return <Navigate to="/client" />;
            // redirect("/client");
          }
        }
      });
  };
  return (
    <>
      <h>Login here</h>
      <Input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="button" onClick={butonLogin}>
        Login
      </Button>
    </>
  );
}

export default Login;
