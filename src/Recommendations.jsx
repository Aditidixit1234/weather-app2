import React from "react";

export default function Recommendations({ information }) {
  if (!information) return null;

  const getRecommendations = () => {
    let tips = [];
    const temp = information.temp;
    const humidity = information.humidity;
    const weather = information.weather.toLowerCase();

    // ☀️ SUNNY / CLEAR
    if (weather.includes("clear")) {
      tips.push("☀️ Great day for travel and outdoor activities");
      tips.push("😎 Wear sunglasses and sunscreen");
    }

    // ☁️ CLOUDY
    if (weather.includes("cloud")) {
      tips.push("☁️ Pleasant weather, good for walking or travel");
    }

    // 🌧️ RAIN
    if (weather.includes("rain") || weather.includes("drizzle")) {
      tips.push("☔ Carry an umbrella or raincoat");
      tips.push("🚶 Avoid slippery roads");
    }

    // ❄️ SNOW / COLD
    if (weather.includes("snow") || temp < 10) {
      tips.push("🧥 Wear warm clothes");
      tips.push("🔥 Stay indoors if too cold");
    }

    // 🌫️ MIST / HAZE
    if (weather.includes("mist") || weather.includes("haze")) {
      tips.push("😷 Low visibility — drive carefully");
    }

    // 🌡️ TEMPERATURE BASED
    if (temp > 35) {
      tips.push("🔥 Extreme heat — avoid going outside");
      tips.push("💧 Drink plenty of water");
    } else if (temp > 28) {
      tips.push("🥵 Warm weather — stay hydrated");
    } else if (temp < 5) {
      tips.push("❄️ Very cold — limit outdoor exposure");
    }

    // 💧 HUMIDITY BASED
    if (humidity > 80) {
      tips.push("💦 High humidity — may feel uncomfortable");
    } else if (humidity < 30) {
      tips.push("🌵 Dry air — keep yourself hydrated");
    }

    // 🌟 GENERAL SMART SUGGESTION
    if (tips.length === 0) {
      tips.push("🙂 Weather looks normal — enjoy your day!");
    }

    return tips;
  };

  return (
    <div style={{ marginTop: "25px", color: "white" }}>
      <h3>🌟 Recommendations</h3>

      <div style={{ marginTop: "10px" }}>
        {getRecommendations().map((tip, index) => (
          <div key={index} style={{ marginBottom: "6px" }}>
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}