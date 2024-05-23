import React, { useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const API_KEY = "43e5dc431fadb6537c1240baed596e25";

  const getWeather = async () => {
    try {
      if (!city.trim()) {
        setError("city name cannot be empty");
        return;
      }
      setError("");
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const temp = await response.json();
      setWeather(temp);
    } catch (error) {
      setError(error);
    }
  };

  console.log(weather);
  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="enter city name"
      />
      <button onClick={getWeather}>Get Weather</button>
      <div>
        {error && <label style={{ color: "red" }}>{error}</label>}
        {weather && (
          <div>
            <h3>{weather.name}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;