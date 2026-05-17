import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import InformationBox from "./InformationBox";
import RainEffect from "./RainEffect";
import SunEffect from "./SunEffect";
import SnowEffect from "./SnowEffect";
import "./WeatherApp.css";
import Recommendations from "./Recommendations";
import Forecast from "./Forecast";

function WeatherApp() {
  const [weatherInformation, setWeather] = useState({
    city: "Delhi",
    feelsLike: 11.45,
    humidity: 82,
    temp: 12.05,
    tempMax: 12.05,
    tempMin: 12.05,
    weather: "mist",
  });

  const [background, setBackground] = useState("");

  const update = (newInfo) => {
    setWeather(newInfo);
  };

  // ✅ SAME RULE AS INFORMATION BOX
  const getBackgroundImage = () => {
    if (weatherInformation.humidity > 80) {
      return "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop";
    }
    if (weatherInformation.temp > 25) {
      return "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1608889175874-6d4d6c1c9e2b?q=80&w=2070&auto=format&fit=crop";
  };

  useEffect(() => {
    if (!weatherInformation) return;
    setBackground(getBackgroundImage());
  }, [weatherInformation]);

  // ✅ SAME RULE FOR EFFECTS
  const isRain = weatherInformation.humidity > 80;
  const isSunny = weatherInformation.temp > 25;
  const isCold =
    weatherInformation.temp <= 25 && weatherInformation.humidity <= 80;

  // ⭐ SCORE
  const calculateScore = () => {
    let score = 100;

    if (weatherInformation.temp > 35) score -= 30;
    if (weatherInformation.temp < 5) score -= 30;
    if (weatherInformation.humidity > 80) score -= 20;

    return Math.max(score, 10);
  };

  const score = calculateScore();

  return (
    <div
      className="appWrapper"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* 🌧️ RAIN */}
      {isRain && <RainEffect />}

      {/* ☀️ SUNNY */}
      {isSunny && <SunEffect />}

      {/* ❄️ COLD */}
      {isCold && <SnowEffect />}

      <div className="content">
        <h1>Weather App</h1>

        <SearchBox update={update} />

        <div className="mainLayout">

          <div className="leftPanel">
            <Forecast information={weatherInformation} />
          </div>

          <div className="centerPanel">
            <InformationBox
              information={weatherInformation}
              score={score}
            />
          </div>

          <div className="rightPanel">
            <Recommendations information={weatherInformation} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default WeatherApp;