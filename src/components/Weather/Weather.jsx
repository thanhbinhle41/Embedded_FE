import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import axios from "axios";

function Weather() {
  const [weatherData, setWeatherData] = useState({
    srcImg: require("../../images/clear.png"),
    temperature: "°C",
    description: "",
    humidity: "%",
    wind: "Km/h",
  });

  const getWeatherData = async () => {
    const APIKey = '136112cb56def6a1e225c633935814ab';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${"ha noi"}&units=metric&appid=${APIKey}`;
  
    try {
      const response = await axios.get(url);
      if (response.status !== 200) return
      const data = response.data;
      const tmpWeatherData = structuredClone(weatherData);

      tmpWeatherData.temperature = `${parseInt(data.main.temp)} °C`
      tmpWeatherData.description = (data.weather[0].description)
      tmpWeatherData.humidity = `${data.main.humidity}%`
      tmpWeatherData.wind = `${parseInt(data.wind.speed)} Km/h`;

      switch (data.weather[0].main) {
        case 'Clear':
            tmpWeatherData.srcImg = require("../../images/clear.png");
            break;

        case 'Rain':
            tmpWeatherData.srcImg = require("../../images/rain.png");
            break;

        case 'Snow':
            tmpWeatherData.srcImg = require("../../images/snow.png");
            break;

        case 'Clouds':
            tmpWeatherData.srcImg = require("../../images/cloud.png");
            break;

        case 'Haze':
            tmpWeatherData.srcImg = require("../../images/mist.png");
            break;

        default:
            tmpWeatherData.srcImg = require("../../images/clear.png");
    }
      setWeatherData(tmpWeatherData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeatherData()
  }, [])

  return (
    <div className="d-flex flex-row align-items-center h-100">
      <div className="d-flex">
        <img
          className={styles.img}
          src={weatherData.srcImg}
          alt="weather-img"
        ></img>
      </div>
      <div className="d-flex flex-column ms-4">
        <span className={styles.temperature}>{weatherData.temperature}</span>
        <span className={styles.description}>{weatherData.description}</span>
      </div>
      <div className="d-flex flex-column ms-4">
        <div className={`${styles.humidity}`}>
          <i className="fa-solid fa-water"></i>
          <span className="ms-3">{weatherData.humidity}</span>
        </div>
        <div className={`${styles.wind}`}>
          <i className="fa-solid fa-wind"></i>
          <span className="ms-3">{weatherData.wind}</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
