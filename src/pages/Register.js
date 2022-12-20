import Button from "reactstrap/lib/Button";
import Input from "reactstrap/lib/Input";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState(1);

  const navigate = useNavigate();
  const butonRegister = (e) => {
    e.preventDefault();
    console.log(password == secondPassword);
    const user = { username, password, address, age, role };
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((Response) => {
      // Response.json();
      console.log(Response);
      if (password == secondPassword) {
        navigate("/login");
      } else alert("Passwords must match!");
    });

    // console.log("username= " + username);
  };

  return (
    <>
      <h>Register here</h>
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
      <Input
        type="password"
        id="secondPassword"
        name="secondPassword"
        placeholder="Confirm Password"
        value={secondPassword}
        onChange={(e) => setSecondPassword(e.target.value)}
      />
      <Input
        type="text"
        id="address"
        name="address"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        type="text"
        id="age"
        name="age"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <Button type="button" onClick={butonRegister}>
        Register
      </Button>
    </>
  );
}

export { UserRegister };
