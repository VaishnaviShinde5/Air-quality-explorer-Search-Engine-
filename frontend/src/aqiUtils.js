// Helper functions for AQI category and health messages

export function getAqiCategory(aqi) {
  if (aqi <= 50) return { label: "Good", color: "#22c55e" }; // green
  if (aqi <= 100) return { label: "Moderate", color: "#eab308" }; // yellow
  if (aqi <= 150)
    return { label: "Unhealthy for Sensitive Groups", color: "#f97316" }; // orange
  if (aqi <= 200) return { label: "Unhealthy", color: "#ef4444" }; // red
  if (aqi <= 300) return { label: "Very Unhealthy", color: "#8b5cf6" }; // purple
  return { label: "Hazardous", color: "#7e22ce" }; // dark purple
}

export function getHealthMessage(aqi) {
  if (aqi <= 50) return "Air quality is considered satisfactory, and air pollution poses little or no risk.";
  if (aqi <= 100)
    return "Air quality is acceptable; however, some pollutants may pose a moderate health concern for a very small number of sensitive people.";
  if (aqi <= 150)
    return "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
  if (aqi <= 200)
    return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects.";
  if (aqi <= 300)
    return "Health alert: everyone may experience more serious health effects.";
  return "Health warnings of emergency conditions. The entire population is more likely to be affected.";
}
