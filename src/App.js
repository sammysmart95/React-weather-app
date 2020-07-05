import React, { useState } from "react";
import Search from "./components/Search";
import Location from "./components/Location";
import Time from "./components/Time";
import axios from "axios";

const App = () => {
  // console.log(process.env.REACT_APP_WEATHER_API_KEY);

  let key = process.env.REACT_APP_WEATHER_API_KEY;
  let base = `http://api.openweathermap.org/data/2.5/weather?q=`;
  let foreCast = `http://api.openweathermap.org/data/2.5/forecast?q=`;
  let forecastKey = `&appid=${key}`;
  let urlkey = `&unit=metric&appid=${key}`;

  const [searchValue, setSearchValue] = useState("");
  const [weather, setWeather] = useState({
    results: {},
  });
  const [forecast, setForecast] = useState({
    outcome: {},
  });

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchData = (e) => {
    if (e.key === "Enter") {
      axios
        .get(base + searchValue + urlkey)
        .then(({ data }) => {
          let results = data;
          console.log(results);
          setWeather((prevState) => {
            return {
              ...prevState,
              results: results,
            };
          });
          setSearchValue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchForecast = (e) => {
    if (e.key === "Enter") {
      axios
        .get(foreCast + searchValue + forecastKey)
        .then(({ data }) => {
          let outcome = data;
          // console.log(outcome);
          setForecast((prevState) => {
            return {
              ...prevState,
              outcome: outcome,
            };
          });
          setSearchValue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleApiCall = (e) => {
    fetchData(e);
    fetchForecast(e);
  };

  return (
    <div className="app">
      <header>
        <h2>Weather Forecast</h2>
        <Search
          handleInput={handleInput}
          searchValue={searchValue}
          fetchData={handleApiCall}
        />
      </header>
      <main>
        <div className="time">
          <Time />
        </div>
        {typeof weather.results.main != "undefined" ? (
          <Location results={weather.results} outcome={forecast.outcome} />
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
