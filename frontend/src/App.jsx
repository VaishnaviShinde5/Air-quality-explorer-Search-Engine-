import { useState } from "react";
import "./App.css";
import { getAqiCategory, getHealthMessage } from "./aqiUtils";

const API_BASE = "http://localhost:4000"; // your backend

function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // AQI data from backend
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const query = city.trim();
    if (!query) {
      setError("Please enter a city name.");
      setData(null);
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const resp = await fetch(
        `${API_BASE}/api/air-quality?city=${encodeURIComponent(query)}`
      );

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        const msg = body.error || "Failed to fetch air quality data.";
        throw new Error(msg);
      }

      const json = await resp.json();
      setData(json);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const renderResult = () => {
    if (!data) return null;

    const category = getAqiCategory(data.aqi);
    const health = getHealthMessage(data.aqi);

    const pollutantEntries = Object.entries(data.pollutants || {});

    return (
      <div className="result-card">
        <div className="result-header">
          <div>
            <h2>{data.cityName}</h2>
            <p className="coords">
              Lat: {data.coordinates?.lat?.toFixed(3) ?? "N/A"}, Lon:{" "}
              {data.coordinates?.lon?.toFixed(3) ?? "N/A"}
            </p>
            <p className="updated">
              Updated: {data.lastUpdated || "N/A"}{" "}
              {data.timezone ? `(${data.timezone})` : ""}
            </p>
          </div>

          <div
            className="aqi-badge"
            style={{
              background: `radial-gradient(circle at top, ${category.color}, #020617)`
            }}
          >
            <div className="aqi-value">{data.aqi}</div>
            <div className="aqi-label">{category.label}</div>
          </div>
        </div>

        <p className="health-message">{health}</p>

        <div className="pollutants-grid">
          {pollutantEntries.length === 0 && (
            <div className="pollutant-card">
              <div className="pollutant-name">No data</div>
              <div className="pollutant-value">-</div>
            </div>
          )}

          {pollutantEntries.map(([name, value]) => {
            // backend may send pollutant as {v: number} or just number
            const val =
              typeof value === "number"
                ? value
                : typeof value?.v === "number"
                ? value.v
                : "-";

            const isDominant =
              data.dominantPollutant &&
              name.toLowerCase() === data.dominantPollutant.toLowerCase();

            return (
              <div key={name} className="pollutant-card">
                <div className="pollutant-name">{name.toUpperCase()}</div>
                <div className="pollutant-value">{val}</div>
                {isDominant && (
                  <span className="pill-dominant">Dominant</span>
                )}
              </div>
            );
          })}
        </div>

        {data.sourceUrl && (
          <div className="source">
            Source:{" "}
            <a href={data.sourceUrl} target="_blank" rel="noreferrer">
              World Air Quality Index (WAQI)
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Air Quality Explorer</h1>
        <p className="subtitle">
          Search AQI by city and explore detailed pollutant breakdown in a dark
          neon dashboard.
        </p>

        <div className="search-row">
          <input
            type="text"
            placeholder="Enter city name (e.g., Delhi, Mumbai, London)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className={`status ${error ? "error" : ""}`}>
          {error && <span>{error}</span>}
          {!error && loading && <span>Fetching air quality data...</span>}
        </div>

        {renderResult()}
      </div>
    </div>
  );
}

export default App;
