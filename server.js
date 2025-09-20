const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000; // gunakan port dari Railway

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // folder "public" berisi index.html

// Lokasi file penyimpanan data
const dataFile = path.join(__dirname, "data.json");

// Endpoint GET data
app.get("/api/data", (req, res) => {
  if (!fs.existsSync(dataFile)) {
    return res.json({ jadwal: [], tugas: [] });
  }
  const data = fs.readFileSync(dataFile, "utf-8");
  res.json(JSON.parse(data));
});

// Endpoint POST data
app.post("/api/data", (req, res) => {
  fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
  res.json({ message: "Data berhasil disimpan" });
});

// Route root → arahkan ke index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
