import './App.css';
import React, { useState } from 'react';

const api = {
  key: '8637c48831fba96b73b96b21e2c8b36d',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(result => {
        setWeather(result);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
        setWeather(null);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Header */}
        <h1>Live Weather Checker</h1>
        
        {/* Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={searchPressed}>Search</button>
        </div>

        {/* Display Weather */}
        {weather && (
          <div className="weather-container">
            {/* Location */}
            <p className="location">{weather.name}</p>

            {/* Temperature */}
            <p className="temperature">{weather.main.temp}°C</p>

            {/* Weather Condition */}
            <div className="weather-condition">
              <p className="weather-main">{weather.weather[0].main}</p>
              <p className="weather-description">({weather.weather[0].description})</p>
            </div>
          </div>
        )}

        {/* Display Error */}
        {error && <p className="error-message">{error}</p>}
      </header>
    </div>
  );
}

export default App;
