require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getAirQualityForCity } = require("./waqiClient");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/air-quality", async (req, res) => {
  const city = (req.query.city || "").trim();
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const data = await getAirQualityForCity(city);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Running: http://localhost:${PORT}`);
});
