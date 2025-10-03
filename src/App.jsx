import React, { useState, useEffect } from "react";
import LiquidEther from './components/LiquidEther'; // Component
import './components/LiquidEther.css';             // CSS
import Animation from './Animation';                // Animation component

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
    if (!weather) return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clouds": return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      case "rain":
      case "drizzle": return "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)";
      case "thunderstorm": return "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)";
      case "snow": return "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)";
      case "clear": return "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff8a80 100%)";
      case "mist":
      case "fog": return "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";
      case "haze": return "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)";
      default: return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  };

  const getWeatherTextColor = () => {
    if (!weather) return "#fff";
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clear": return "#2c3e50";
      case "snow": return "#2c3e50";
      case "mist":
      case "fog": return "#2c3e50";
      case "haze": return "#2c3e50";
      default: return "#fff";
    }
  };

  const getWeatherShadow = () => {
    if (!weather) return "0 20px 60px rgba(102, 126, 234, 0.4)";
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clouds": return "0 20px 60px rgba(79, 172, 254, 0.4)";
      case "rain":
      case "drizzle": return "0 20px 60px rgba(102, 126, 234, 0.4)";
      case "thunderstorm": return "0 20px 60px rgba(44, 62, 80, 0.6)";
      case "snow": return "0 20px 60px rgba(240, 147, 251, 0.4)";
      case "clear": return "0 20px 60px rgba(255, 138, 128, 0.4)";
      case "mist":
      case "fog": return "0 20px 60px rgba(168, 237, 234, 0.4)";
      case "haze": return "0 20px 60px rgba(255, 154, 158, 0.4)";
      default: return "0 20px 60px rgba(102, 126, 234, 0.4)";
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
          boxShadow: getWeatherShadow(),
          backdropFilter: "blur(20px)",
          color: getWeatherTextColor(),
          textAlign: "center",
          border: "2px solid rgba(255,255,255,0.3)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: "translate(-50%, -50%) scale(1)",
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
              padding: "12px 16px",
              borderRadius: "10px 0 0 10px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.2)",
              color: getWeatherTextColor(),
              fontWeight: "500",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              borderRadius: "0 10px 10px 0",
              border: "none",
              background: "linear-gradient(135deg, #ff7eb3, #ff6b9d)",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 126, 179, 0.4)",
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
              marginTop: "15px",
              padding: "25px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.15)", 
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(15px)",
              transition: "all 0.4s ease",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              {weather.name}, {weather.sys.country}
            </h2>

            <Animation weatherCondition={weather.weather[0].main} />

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