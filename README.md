<img width="902" height="421" alt="img_finfactor" src="https://github.com/user-attachments/assets/ab8c6266-c53d-43c8-a0bf-ed28193b4c9c" />
🌫️Air Quality Explorer
Search global city air quality with a fast, intelligent full-stack AQI search engine

This project is a full-stack application that allows users to search for Air Quality Index (AQI) of any city in the world and view detailed pollutant breakdown, health impact messages, timestamps, geographical data, and AQI categories.

It consists of:

Frontend: React + Vite (Dark Neon UI Dashboard)

Backend: Node.js + Express (REST API)

Caching Layer: Custom LRU in-memory cache for high performance

External Provider: World Air Quality Index API (WAQI)

This project was developed as part of a coding challenge for Finfactor Technologies.

🚀 Features
🔎 1. City Search Engine

Type any city name (e.g., Delhi, London, Pune)
→ Immediately fetch and display AQI & pollutant data.

🌫️ 2. Real-time Air Quality Index

Overall AQI value
AQI category color (Good, Moderate, Unhealthy, etc.)
Dominant pollutant
Timestamp & timezone
Source attribution link (WAQI official)

🧪 3. Detailed Pollutant Breakdown

Includes indicators like:

PM2.5
PM10
CO
SO2
NO2
O3
Temperature
Dew
Wind
…and more depending on city availability.

💬 4. Health Impact Message

Dynamic message based on AQI:

Good
Moderate
Unhealthy
Very Unhealthy
Hazardous

⚡ 5. High-Performance Caching (LRU)

Backend caches results for:
Fast repeated searches
Lower API usage
10-minute TTL per city
Maximum 100 LRU entries

🎨 6. Polished Dark-Neon UI

Modern dashboard layout
AQI badge with gradient glow
Pollutant tiles
Error cards & loader
AQI Legend Scale (Good → Hazardous)

💻 7. Fully Local Setup

Backend on http://localhost:4000
Frontend on http://localhost:5173


🏗️8. System Architecture
┌──────────┐      ┌───────────────────┐      ┌────────────────────────┐
│  Frontend│ ---> │ Backend (Express) │ ---> │  WAQI External API     │
│ (React)  │ <--- │ + LRU Cache       │ <--- │  (aqicn.org/api/)       │
└──────────┘      └───────────────────┘      └────────────────────────┘
Flow:

1.User searches a city in React UI
2.React calls your backend /api/air-quality?city=...
3.Backend checks cache
4.If not cached → fetch from WAQI
5.Response stored in LRU cache
6.Backend formats response & sends to frontend
7.UI renders a beautiful dashboard


🔌 API Documentation
Endpoint
GET /api/air-quality?city=<cityName>

Parameters
Name	Type	 Required	    Example
city	string	 Yes	        London




Example
After starting backend, visit:

👉 http://localhost:4000/api/air-quality?city=Delhi

You should get JSON like:

```json
{
  "cityName": "Major Dhyan Chand National Stadium, Delhi, India",
  "coordinates": {
    "lat": 28.612498,
    "lon": 77.237388
  },
  "aqi": 263,
  "dominantPollutant": "pm25",
  "pollutants": {
    "co": 3.81,
    "no2": 44.3,
    "o3": 3.3,
    "p": 992,
    "pm10": 236,
    "pm25": 263,
    "so2": 9,
    "t": 14.14,
    "w": 0.4,
    "wd": 198
  },
  "lastUpdated": "2025-11-26 11:00:00",
  "timezone": "+05:30",
  "sourceUrl": "https://aqicn.org/city/delhi/major-dhyan-chand-national-stadium"
}
⚙️ Installation & Setup
1️⃣ Clone Repository

git clone https://github.com/VaishnaviShinde5/air-quality-explorer.git
cd air-quality-explorer

🟦 Backend Setup (Node + Express)

cd backend
npm install
Create .env file:

WAQI_TOKEN=your_token_here
PORT=4000

Start backend:
npm start
✔ Runs on: http://localhost:4000

🟩 Frontend Setup (React + Vite)

cd ../frontend
npm install
npm run dev
✔ Runs on: http://localhost:5173





