import React, { useState, useEffect } from 'react';
import './Home.css';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '6cf65b962894a951e7b2c5317e763f2b'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError('City not found. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    
    const main = weather.weather[0].main;
    const size = 80;
    
    switch (main) {
      case 'Clear':
        return <WiDaySunny size={size} />;
      case 'Rain':
        return <WiRain size={size} />;
      case 'Clouds':
        return <WiCloudy size={size} />;
      case 'Snow':
        return <WiSnow size={size} />;
      case 'Thunderstorm':
        return <WiThunderstorm size={size} />;
      default:
        return <WiDaySunny size={size} />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <div className="header">
          <h1>Welcome to the Weather App</h1>
        </div>
        
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="weather-icon">
              {getWeatherIcon()}
            </div>
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <p>{weather.weather[0].description}</p>
            
            <div className="weather-details">
              <div className="detail-item">
                <span>Humidity</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span>Wind</span>
                <span>{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span>Feels Like</span>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
            </div>
          </div>
        )}

        <p className="author-credit">Aadarsh Kumar Singh</p>
      </div>
    </div>
  );
};

export default Home;
