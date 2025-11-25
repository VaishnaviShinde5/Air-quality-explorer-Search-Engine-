const axios = require("axios");
const { LruCache } = require("./cache");

const cache = new LruCache(10 * 60 * 1000, 100);

async function getAirQualityForCity(city) {
  const key = city.toLowerCase().trim();
  const cached = cache.get(key);
  if (cached) return cached;

  const token = process.env.WAQI_TOKEN;
  if (!token) throw new Error("WAQI token missing in .env");

  const url = `https://api.waqi.info/feed/${encodeURIComponent(key)}/?token=${token}`;
  const resp = await axios.get(url);

  if (resp.data.status !== "ok") throw new Error("City not found");

  const d = resp.data.data;
  const pollutants = {};
  if (d.iaqi) {
    for (const p in d.iaqi) pollutants[p] = d.iaqi[p].v;
  }

  const result = {
    cityName: d.city.name,
    coordinates: { lat: d.city.geo[0], lon: d.city.geo[1] },
    aqi: d.aqi,
    dominantPollutant: d.dominentpol,
    pollutants,
    lastUpdated: d.time.s,
    timezone: d.time.tz,
    sourceUrl: d.city.url
  };

  cache.set(key, result);
  return result;
}

module.exports = { getAirQualityForCity };
