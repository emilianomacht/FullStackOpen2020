import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayCountry = ({ country }) => {
  const [weather, setWeather] = useState(
      { 
        current: 
        { 
          temperature: null,
          weather_icons: [],
          wind_dir: "",
          wind_speed: null
        } 
      }
  );

  const api_key = process.env.REACT_APP_API_KEY;
  // console.log('api_key', api_key);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=m`
      )
      .then((response) => {
        console.log("response.data", response.data);
        setWeather(response.data);
      });
  }, [country, api_key]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h4>languages</h4>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>

      <img src={country.flag} alt="flag" width="100px" />

      <h4>Weather in {country.capital}</h4>
      <p>
        <strong>temperature: </strong>
        {weather.current.temperature} Celsius
      </p>
      <img src={weather.current.weather_icons[0]} alt="weather" width="100px" />
      <p>
        <strong>wind: </strong> {weather.current.wind_speed} km/h direction {weather.current.wind_dir}
      </p>
    </div>
  );
};

export default DisplayCountry;
