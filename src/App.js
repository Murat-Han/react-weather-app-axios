import React, { useEffect, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { getWeatherData } from "./data/Weatherapi";
import { Dimmer, Loader} from "semantic-ui-react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Istanbul");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const regionNames = new Intl.DisplayNames(['en'], {type: 'region'})
  
  async function getData(){
    try {
      setLoading(true)
      const data = await getWeatherData(city);
      setWeatherData(data);
      setLoading(false)
      console.log(data);
      setCity("");
    } catch (error) {
      console.log(error.message);
    }
  };
 
  return (
    <div className="App">
      {weatherData !== null ? (
        <div className="card">
          <h2 className="title">
            <i className="fa fa-cloud"></i>Weather App
          </h2>
          <div className="search-form">
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder="Enter a city name to search weather..."
            />
            <button disabled={loading} onClick={()=> getData()}>Search</button>
          </div>
          <div className="main-container">
            <h4>Live Weather Condition</h4>
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="iconimage"
              />
            </div>
          </div>
          <h3>{weatherData.weather[0].main}</h3>
          <div className="temperature">
            <h2>{parseFloat(weatherData.main.temp).toFixed(1)} &deg;C</h2>
          </div>
          <div className="location">
            <h3>
              <i className="fas fa-map-marker-alt"></i>
              <span className="temp"> {weatherData.name.toLowerCase().toLocaleUpperCase("TR")}</span> |
              <span className="temp">{regionNames.of(weatherData.sys.country)}</span>
            </h3>
          </div>
          <div className="temperature-range">
            <h5>
              <span className="temp">Temperature:</span> <span className="temp">Min:
              {parseFloat(weatherData.main.temp_min).toFixed(1)} &deg;C</span> ||<span className="temp"> Maks:
              {parseFloat(weatherData.main.temp_max).toFixed(1)} &deg;C</span> ||<span className="temp">
              Humidity: {weatherData.main.humidity} %</span>
            </h5>
          </div>
        </div>
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

export default App;
