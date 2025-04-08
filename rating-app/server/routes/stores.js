const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const ratingsFile = path.join(__dirname, "../data/ratings.txt");
const storesFile = path.join(__dirname, "../data/stores.txt");

// Load & Save Ratings
const loadRatings = () => {
  if (!fs.existsSync(ratingsFile)) return [];
  const data = fs.readFileSync(ratingsFile, "utf-8");
  return data ? JSON.parse(data) : [];
};

const saveRatings = (ratings) => {
  fs.writeFileSync(ratingsFile, JSON.stringify(ratings, null, 2));
};

// Load stores
const loadStores = () => {
  if (!fs.existsSync(storesFile)) return [];
  const data = fs.readFileSync(storesFile, "utf-8");
  return data ? JSON.parse(data) : [];
};

// Save stores
const saveStores = (stores) => {
  fs.writeFileSync(storesFile, JSON.stringify(stores, null, 2));
};

// GET all stores
router.get("/", (req, res) => {
  const stores = loadStores();
  res.json(stores);
});

// POST a new store
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Store name is required" });
  }

  const stores = loadStores();
  stores.push({ name });
  saveStores(stores);
  res.json({ message: "Store added successfully" });
});

router.post("/rate", (req, res) => {
  console.log("Rating request received:", req.body);
  const { storeName, rating, userEmail } = req.body;

  if (!storeName || !rating || !userEmail) {
    return res.status(400).json({ message: "Missing rating info" });
  }

  const ratings = loadRatings();
  ratings.push({ storeName, rating, userEmail });
  saveRatings(ratings);
  res.json({ message: "Rating submitted!" });
});

module.exports = router;
