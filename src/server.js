const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    name,
    email,
    password,
  };
  users.push(user);
  const token = jwt.sign({ email }, "secret");
  res.status(200).json({ message: "User registered!", token });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email }, "secret");
    res.status(200).json({ message: "Login successful!", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
