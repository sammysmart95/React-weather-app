import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Location from "./components/Location";
import Time from "./components/Time";
import axios from "axios";

const App = () => {
  let key = process.env.REACT_APP_WEATHER_API_KEY;
  let urlkey = `&unit=metric&appid=${key}`;
  let forecastKey = `&appid=${key}`;
  let base = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let foreCast = `https://api.openweathermap.org/data/2.5/forecast?q=`;

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("coordinates");
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let coordinates = [lat, long];
        // console.log(`Latitude: ${lat}, Longitude: ${long}`);
        getCity(coordinates);
        getCityForcast(coordinates);
      },

      function (err) {
        console.log("coordinates");
        console.warn(`ERROR(${err.code}): ${err.message}`);
        console.log("The Locator was denied. :(");
      }
    );
  }, []);

  const getCity = (coordinates) => {
    let lat = coordinates[0];
    let lon = coordinates[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}` +
          forecastKey
      )
      .then(({ data }) => {
        let results = data;
        setWeather((prevState) => {
          return {
            ...prevState,
            results: results,
          };
        });
        setSearchValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCityForcast = (coordinates) => {
    let lat = coordinates[0];
    let lon = coordinates[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}` +
          forecastKey
      )
      .then(({ data }) => {
        let outcome = data;
        setForecast((prevState) => {
          return {
            ...prevState,
            outcome: outcome,
          };
        });
        setSearchValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = (e) => {
    if (e.key === "Enter") {
      if (searchValue === "") {
        return;
      } else {
        axios
          .get(base + searchValue + urlkey)
          .then(({ data }) => {
            let results = data;
            setWeather((prevState) => {
              return {
                ...prevState,
                results: results,
              };
            });
            setSearchValue("");
          })
          .catch((err) => {
            window.alert("City can not be found!");
            console.log(err);
          });
      }
    }
  };

  const fetchForecast = (e) => {
    if (e.key === "Enter") {
      if (searchValue === "") {
        return;
      } else {
        axios
          .get(foreCast + searchValue + forecastKey)
          .then(({ data }) => {
            let outcome = data;

            setForecast((prevState) => {
              return {
                ...prevState,
                outcome: outcome,
              };
            });
            setSearchValue("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
