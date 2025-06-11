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
  CatImage,
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
  justify-content: flex-start;
  align-items: center;
  margin-top: 5rem;
  width: 100%;
`;

const CatImageWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  margin-top: 5rem;
`;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);

  const { setSunTimes } = useWeather();

  const handleSearch = async () => {
    setCityNotFound(false);
    setWeather(null);
    setForecast(null);
    setSuggestions([]);
    try {
      const similarCities = await searchSimilarCities(city);
      if (similarCities.length > 0) {
        setSuggestions(similarCities);
      } else {
        setCityNotFound(true);
      }
    } catch (error) {
      console.error("Search error: ", error);
      setCityNotFound(true);
    }
  };

  const handleSuggestionClick = async (suggestedName) => {
    setCityNotFound(false);
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
      // console.log(forecastResult);
    } catch (error) {
      console.error("Get result error: ", error);
      setCityNotFound(true);
    }
  };

  return (
    <>
      <Container>
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
        {cityNotFound && <p>City not found, try to input a part of name</p>}
        {suggestions !== undefined && suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            handleClick={handleSuggestionClick}
          />
        )}

        {weather && <WeatherCard weather={weather} />}

        {forecast && (
          <ForecastWrapper>
            {forecast.map((item, index) => (
              <ForecastCard forecastItem={item} key={`f${index}`} />
            ))}
          </ForecastWrapper>
        )}

        {weather && (
          <CatImageWrapper>
            <CatImage weather={weather} size={"320px"} />
          </CatImageWrapper>
        )}
      </Container>
    </>
  );
}

export default App;
