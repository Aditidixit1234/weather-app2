import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InformationBox.css";

import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function InformationBox({ information }) {
  if (!information) return null;

  // 🔥 SCORE CALCULATION
  const calculateScore = (info) => {
    let score = 100;

    if (info.temp > 35) score -= 30;
    else if (info.temp > 30) score -= 20;
    else if (info.temp < 5) score -= 25;
    else if (info.temp < 10) score -= 10;

    if (info.humidity > 80) score -= 20;
    else if (info.humidity > 60) score -= 10;

    const w = info.weather.toLowerCase();

    if (w.includes("rain")) score -= 20;
    else if (w.includes("snow")) score -= 15;
    else if (w.includes("mist") || w.includes("haze")) score -= 10;
    else if (w.includes("clear")) score += 5;

    return Math.max(0, Math.min(100, score));
  };

  const score = calculateScore(information);

  // 🌄 IMAGES (UNCHANGED)
  const HOT_URL =
    "https://plus.unsplash.com/premium_photo-1661934660615-4918f28476f9?q=80&w=2071";

  const COLD_URL =
    "https://plus.unsplash.com/premium_photo-1670428635685-dd49306e5622?w=600";

  const WEATHER_URL =
    "https://images.unsplash.com/photo-1722858343990-1604f540c15d?w=600";

  const getWeatherImage = () => {
    if (information.humidity > 80) return WEATHER_URL;
    if (information.temp > 25) return HOT_URL;
    return COLD_URL;
  };

  const getWeatherIcon = () => {
    if (information.humidity > 80) return <BeachAccessIcon />;
    if (information.temp > 25) return <WbSunnyIcon />;
    return <AcUnitIcon />;
  };

  // 🎨 SCORE COLOR
  const getScoreGradient = (score) => {
    if (score > 80) return "linear-gradient(90deg, #00c853, #64dd17)";
    if (score > 60) return "linear-gradient(90deg, #8bc34a, #cddc39)";
    if (score > 40) return "linear-gradient(90deg, #ffc107, #ff9800)";
    return "linear-gradient(90deg, #ff5252, #d50000)";
  };

  // 🤖 REACTIVE LABEL + EMOJI
  const getScoreLabel = (score) => {
    if (score > 80) return { text: "Excellent", emoji: "😎🌈" };
    if (score > 60) return { text: "Nice", emoji: "🙂" };
    if (score > 40) return { text: "Okay", emoji: "😐" };
    return { text: "Poor", emoji: "😵⚠️" };
  };

  const label = getScoreLabel(score);

  return (
    <div className="InformationBox">
      <div className="cardContainer">
        <Card
          sx={{
            width: 400,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            color: "white",
          }}
        >
          {/* IMAGE */}
          <CardMedia sx={{ height: 180 }} image={getWeatherImage()} />

          <CardContent>
            {/* CITY */}
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {information.city} {getWeatherIcon()}
            </Typography>

            {/* WEATHER DETAILS */}
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
              }}
            >
              <div>🌡️ Temperature: {information.temp}°C</div>
              <div>💧 Humidity: {information.humidity}</div>
              <div>📉 Min Temp: {information.tempMin}°C</div>
              <div>📈 Max Temp: {information.tempMax}°C</div>
              <div>
                {information.weather} | Feels like{" "}
                {information.feelsLike}°C
              </div>
            </Typography>

            {/* ⭐ WEATHER SCORE */}
            <div style={{ marginTop: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "5px" }}>
                Weather Score
              </div>

              {/* BAR */}
              <div
                style={{
                  height: "12px",
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="scoreFill"
                  style={{
                    width: `${score}%`,
                    background: getScoreGradient(score),
                  }}
                ></div>
              </div>

              {/* LABEL */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "6px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                <span>
                  {label.text}{" "}
                  <span className="scoreEmoji">{label.emoji}</span>
                </span>
                <span>{score}/100</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}