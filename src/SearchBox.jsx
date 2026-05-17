import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";

function SearchBox({ update }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const url = "https://api.openweathermap.org/data/2.5/weather";
  const key = "00f5b24db8601e0a7a008ae3d11b206d";

  // 🔍 SEARCH BY CITY
  const getWeather = async () => {
    const response = await fetch(
      `${url}?q=${city}&appid=${key}&units=metric`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error("City not found");
    }

    return {
      city: data.name,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      feelsLike: data.main.feels_like,
      weather: data.weather[0].main, // ✅ important fix
    };
  };

  // 📍 GET CURRENT LOCATION WEATHER (CORRECTLY PLACED HERE)
  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          console.log("Lat:", lat, "Lon:", lon);

          const response = await fetch(
            `${url}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
          );

          const data = await response.json();

          update({
            city: data.name,
            temp: data.main.temp,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            humidity: data.main.humidity,
            feelsLike: data.main.feels_like,
            weather: data.weather[0].main,
          });

          setError(false);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      },
      (error) => {
        console.log("Geolocation error:", error);
        alert("❌ Please allow location access");
      }
    );
  };

  // 🔘 FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const newData = await getWeather();
      update(newData);
      setCity("");
    } catch {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <h3>Search Weather</h3>

        <TextField
          label="City name"
          variant="outlined"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <br /><br />

        <Button variant="contained" type="submit">
          Search
        </Button>

        {/* 📍 LOCATION BUTTON */}
        <Button
          variant="outlined"
          onClick={getLocationWeather}
          style={{ marginLeft: "10px" }}
        >
          📍 Use My Location
        </Button>

        {error && <p style={{ color: "red" }}>No such place exists ❌</p>}
      </form>
    </div>
  );
}

export default SearchBox;