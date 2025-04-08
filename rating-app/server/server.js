const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/stores");
// const app = express();
// const storeRoutes = require("./routes/store");
// app.use("/api/stores", storeRoutes);
app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
