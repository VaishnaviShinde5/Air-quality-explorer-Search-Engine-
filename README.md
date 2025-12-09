# 🌫️ Air Quality Explorer  
### Search global city air quality with a fast, intelligent full-stack AQI search engine

Air Quality Explorer is a full-stack web application that allows users to search for the **Air Quality Index (AQI)** of any city worldwide and visualize:

- Real-time AQI  
- Pollutant breakdown  
- Dominant pollutant  
- Health impact messages  
- Timestamps  
- Geographic coordinates  
- AQI category (Good → Hazardous)  

The project follows clean architecture, caching, and REST API principles — built as part of the **Finfactor Technologies Software Engineer Coding Challenge**.

---

# 🚀 Features

### 🔎 **1. City Search Engine**
Instantly fetch AQI data by typing any city name (e.g., Delhi, London, Pune).

### 🌫️ **2. Real-time Air Quality Index**
- AQI value  
- AQI category color  
- Dominant pollutant  
- Updated timestamp  
- Source attribution (WAQI official)

### 🧪 **3. Detailed Pollutant Breakdown**
Includes available metrics such as:

- PM2.5  
- PM10  
- CO  
- SO₂  
- NO₂  
- O₃  
- Temperature  
- Dew  
- Wind speed/direction  
…and more depending on city.

### 💬 **4. Health Impact Message**
Dynamically mapped from AQI category:

| AQI | Category |
|-----|----------|
| 0–50 | Good |
| 51–100 | Moderate |
| 101–150 | Unhealthy for Sensitive Groups |
| 151–200 | Unhealthy |
| 201–300 | Very Unhealthy |
| 301+ | Hazardous |

### ⚡ **5. High-Performance Caching (LRU)**
Backend implements:

- 10-minute TTL per city  
- 100-entry LRU cache  
- Prevents duplicate API calls  
- Improves performance + reduces latency  

### 🎨 **6. Modern Dark-Neon UI**
Built with React + custom CSS:

- Gradient AQI badge  
- Responsive layout  
- Pollutant cards  
- Error messages  
- Loading state  
- AQI color legend  

### 💻 **7. Fully Local Execution**
- Backend → **http://localhost:4000**  
- Frontend → **http://localhost:5173**  

Project runs completely locally as per challenge requirements.

---


# 🏗️ System Architecture

┌──────────┐      ┌───────────────────┐      ┌────────────────────────┐
│ Frontend │ ---> │ Backend (Express) │ ---> │ WAQI External API      │
│ (React)  │ <--- │ + LRU Cache       │ <--- │ aqicn.org/api/         │
└──────────┘      └───────────────────┘      └────────────────────────┘


### **Flow**
1. User searches for a city  
2. Frontend calls: `/api/air-quality?city=<name> 
3. Backend checks LRU cache  
4. If not cached → fetch from WAQI  
5. Cache and format result  
6. Return JSON to frontend  
7. Frontend displays AQI dashboard  

---

# 🔌 API Documentation 

### **Endpoint**
GET /api/air-quality?city=<cityName>

### **Query Parameters**
| Name | Type | Required | Example |
|------|------|----------|---------|
| city | string | yes | London |

---
### **API Example Response**

```json
{
  "cityName": "Major Dhyan Chand National Stadium, Delhi, India",
  "coordinates": { "lat": 28.612498, "lon": 77.237388 },
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

**⚙️ Installation & Setup**
1️⃣ Clone Repository
git clone https://github.com/VaishnaviShinde5/Air-quality-explorer-Search-Engine-.git
cd Air-quality-explorer-Search-Engine-

🟦 Backend Setup (Node + Express)
cd backend
npm install

Create .env:

WAQI_TOKEN=your_token_here
PORT=4000

Start backend:
npm start

Backend runs on:
👉 http://localhost:4000

🟩 Frontend Setup (React + Vite)
cd ../frontend
npm install
npm run dev

Frontend runs on:
👉 http://localhost:5173


🛡 Error Handling

The system gracefully handles:

| Condition         | Behavior                        |
| ----------------- | ------------------------------- |
| City not provided | 400 response                    |
| Invalid city      | Informative error message       |
| API unreachable   | Frontend shows fallback message |
| Cache expired     | Auto-refresh from API           |


🧠 Why This Project Stands Out

✔ Clean full-stack architecture
✔ High-performance caching
✔ Professional modern UI
✔ Excellent code structure
✔ API integration skills
✔ Strong README documentation
✔ Meets all Finfactor requirements

This project demonstrates real-world software engineering ability, not just simple coding.

👤 Developer

Vaishnavi Shinde
GitHub: https://github.com/VaishnaviShinde5


