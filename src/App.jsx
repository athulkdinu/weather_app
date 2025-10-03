import React, { useState, useEffect } from "react";
import LiquidEther from './components/LiquidEther'; // Component
import './components/LiquidEther.css';             // CSS

const API_KEY = "03e1a5c30751fb347bda9957c0e6f903";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
  const [city, setCity] = useState("kottayam");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("City not found!");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city.trim());
  };

  const getWeatherGradient = () => {
    if (!weather) return "rgba(255,255,255,0.1)";
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clouds": return "linear-gradient(135deg, #757f9a, #d7dde8)";
      case "rain":
      case "drizzle": return "linear-gradient(135deg, #667db6, #0082c8, #0082c8, #667db6)";
      case "thunderstorm": return "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
      case "snow": return "linear-gradient(135deg, #e6e9f0, #eef1f5)";
      case "clear": return "linear-gradient(135deg, #fceabb, #f8b500)";
      default: return "rgba(255,255,255,0.1)";
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={true}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: getWeatherGradient(),
          padding: "30px",
          borderRadius: "25px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(15px)",
          color: "#fff",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.4)",
          transition: "all 0.5s ease",
        }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "2rem", letterSpacing: "1px" }}>Weather App</h1>

        <form style={{ display: "flex", marginBottom: "25px" }} onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px 0 0 10px",
              border: "none",
              outline: "none",
              background: "rgba(0,0,0,0.25)",
              color: "#fff",
              fontWeight: "500",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              borderRadius: "0 10px 10px 0",
              border: "none",
              background: "#ff7eb3",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Search
          </button>
        </form>

        {loading && <p style={{ fontStyle: "italic", color: "#fff" }}>Loading...</p>}
        {error && <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>{error}</p>}

        {weather && !loading && (
          <div
            style={{
              marginTop: "10px",
              padding: "20px",
              borderRadius: "25px",
              background: "rgba(0,0,0,0.35)", 
              border: "1px solid rgba(255,255,255,0.5)",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              style={{ marginBottom: "10px" }}
            />

            <p style={{ fontSize: "2.5rem", margin: "10px 0", fontWeight: "bold" }}>
              {Math.round(weather.main.temp)}°C
            </p>

            <p style={{ marginBottom: "10px", fontStyle: "italic" }}>{weather.weather[0].description}</p>

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "15px", color: "#fff" }}>
              <p>Feels: {Math.round(weather.main.feels_like)}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
              <p>Visibility: {(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
