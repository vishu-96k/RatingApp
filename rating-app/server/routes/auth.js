const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const USERS_FILE = path.join(__dirname, "..", "data", "users.txt");

// Helper to read users
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return data ? JSON.parse(data) : [];
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup
router.post("/signup", (req, res) => {
  const { name, email, address, password, role } = req.body;
  let users = readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ name, email, address, password, role });
  saveUsers(users);
  res.status(201).json({ message: "Signup successful" });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ message: "Login successful", user });
});

module.exports = router;
