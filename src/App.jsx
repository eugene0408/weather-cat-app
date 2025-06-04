import { useState } from "react";
import "./App.css";
import styled from "styled-components";

import {
  getWeatherByCity,
  searchSimilarCities,
  getForecastByCity,
} from "./services/weatherApi";

import { useWeather } from "./context/WeatherContext";

import {
  SearchBar,
  Suggestions,
  WeatherCard,
  ForecastCard,
} from "./components";

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  @media (min-width: 420px) {
    max-width: 356px;
  }
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;

const ForecastWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4em;
  width: 100%;
`;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);

  const { setSunTimes } = useWeather();

  const handleSearch = async () => {
    setWeather(null);
    setForecast(null);
    setSuggestions([]);
    try {
      const similarCities = await searchSimilarCities(city);
      setSuggestions(similarCities);
    } catch (error) {
      setCityNotFound(true);
    }
  };

  const handleSuggestionClick = async (suggestedName) => {
    setCity(suggestedName);
    try {
      const weatherResult = await getWeatherByCity(suggestedName);
      setWeather(weatherResult);
      setSunTimes({
        sunrise: weatherResult.sys.sunrise,
        sunset: weatherResult.sys.sunset,
      });
      // console.log(weatherResult);
      const forecastResult = await getForecastByCity(suggestedName);
      setForecast(forecastResult);
      setSuggestions([]);
      console.log(forecastResult);
    } catch (error) {
      setCityNotFound(true);
    }
  };

  return (
    <>
      <Container>
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

        {suggestions !== undefined && suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            handleClick={handleSuggestionClick}
          />
        )}

        {weather && <WeatherCard weather={weather} />}

        {forecast && (
          <section>
            <h3> Forecast </h3>
            <ForecastWrapper>
              {forecast.map((item, index) => (
                <ForecastCard forecastItem={item} key={`f${index}`} />
              ))}
            </ForecastWrapper>
          </section>
        )}
      </Container>
    </>
  );
}

export default App;
