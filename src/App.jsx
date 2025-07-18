import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

import {
  getWeatherByCity,
  searchSimilarCities,
  getForecastByCity,
} from "./services/weatherApi";

import { useWeather } from "./context/WeatherContext";
import { useIsMobile } from "./hooks/useIsMobile";

import {
  SearchBar,
  Suggestions,
  WeatherCard,
  ForecastCard,
  CatImage,
} from "./components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  gap: 16px;
  padding: 16px;
  margin: 0 auto;
  box-sizing: border-box;
  min-height: 100vh;

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

const SearchWrapper = styled.div`
  position: absolute;
  width: 100%;
  padding: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  ${(props) =>
    props.position === "top" &&
    `
      left: 0;
      top: 1rem;
      transform: none;
    `}
  ${(props) =>
    props.position === "bottom" &&
    `
      top: auto;
      left: 0;
      bottom: 10px;
      transform: none;
    `}
`;

const WeatherWrapper = styled.main`
  margin-top: 2rem;
  width: 100%;
`;

const CatImageWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: -1.5rem;
`;

const ForecastWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2.5rem;
  width: 100%;
`;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  // const [localSuggestions, setLocalSuggestions] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);

  const [searchPosition, setSearchPosition] = useState("center");

  const { setLocalWeatherData } = useWeather();
  const isMobile = useIsMobile();

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
      setLocalWeatherData({
        sunrise: weatherResult.sys.sunrise,
        sunset: weatherResult.sys.sunset,
        timezone: weatherResult.timezone,
      });

      const forecastResult = await getForecastByCity(suggestedName);
      setForecast(forecastResult);
      setSuggestions([]);
      console.log("weather:", weatherResult, "forecast:", forecastResult);
    } catch (error) {
      console.error("Get result error: ", error);
      setCityNotFound(true);
    }
  };

  useEffect(() => {
    if (!weather) {
      setSearchPosition("center");
    } else {
      setSearchPosition(isMobile ? "bottom" : "top");
    }
  }, [weather, isMobile]);

  return (
    <Container>
      <SearchWrapper position={searchPosition}>
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
        {cityNotFound && <p>City not found, try to input a part of name</p>}
        {suggestions !== undefined && suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            handleClick={handleSuggestionClick}
          />
        )}
      </SearchWrapper>

      {weather && (
        <WeatherWrapper>
          <WeatherCard weather={weather} />
        </WeatherWrapper>
      )}

      {weather && (
        <CatImageWrapper>
          <CatImage weather={weather} size={"280px"} />
        </CatImageWrapper>
      )}

      {forecast && (
        <ForecastWrapper>
          {forecast.map((item, index) => (
            <ForecastCard forecastItem={item} key={`f${index}`} />
          ))}
        </ForecastWrapper>
      )}
    </Container>
  );
}

export default App;
