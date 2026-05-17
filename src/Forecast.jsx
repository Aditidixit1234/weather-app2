import React from "react";
import "./Forecast.css";

export default function Forecast({ information }) {
  if (!information) return null;

  // ✅ Generate real next 5 days
  const getForecastData = () => {
    const data = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      let label;

      if (i === 0) {
        label = "Today";
      } else if (i === 1) {
        label = "Tomorrow";
      } else {
        label = date.toLocaleDateString("en-US", {
          weekday: "short",
        });
      }

      data.push({
        day: label,
        temp: information.temp + (Math.random() * 4 - 2), // slight variation
        icon: "🌤️",
      });
    }

    return data;
  };

  const forecastData = getForecastData();

  return (
    <div className="forecastContainer">
      <h3>📅 5-Day Forecast</h3>

      <div className="forecastWrapper">
        <div className="forecastScroll">
          {forecastData.map((item, index) => (
            <div className="forecastCard" key={index}>
              <div>{item.day}</div>
              <div className="forecastIcon">{item.icon}</div>
              <div>{Number(item.temp).toFixed(2)}°C</div>
            </div>
          ))}
        </div>

        {/* ➡️ Scroll hint */}
        <div className="scrollArrow">➡️</div>
      </div>
    </div>
  );
}