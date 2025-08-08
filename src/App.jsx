import { useEffect, useState, useRef } from "react";
import "./App.css";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

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
  UserSuggestions,
  WeatherCard,
  ForecastSlider,
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
  height: 100dvh;
  max-width: 768px;
  /* min-height: 100vh; */

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
  transition: all 0.3s ease;
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
  margin-top: 1.5rem;
  width: 100%;
  z-index: 1;
`;

const CatImageWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: -3rem;
  z-index: 2;
`;

const ForecastWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -2rem;
  width: 95%;
`;

function App() {
  const defaultSuggestions = [
    "London",
    "Paris",
    "Kyiv",
    "New York",
    "Sydney",
    "Los Angeles",
    "Tokyo",
    "Rio de Janeiro",
  ];
  const searchRef = useRef(null);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [searchPosition, setSearchPosition] = useState("center");
  const [activeCard, setActiveCard] = useState(0);
  // const [isInputFocused, setIsInputFocused] = useState(false);

  const [userSuggestions, setUserSuggestions] = useLocalStorage(
    "cities",
    defaultSuggestions
  );

  const saveUserCity = (city) => {
    const updated = [city, ...userSuggestions.filter((c) => c != city)];
    setUserSuggestions(updated.slice(0, 8));
  };

  const { setLocalWeatherData } = useWeather();
  const isMobile = useIsMobile();

  const handleInputFocus = () => {
    setCity(""); //clear input
    if (isMobile && weather) {
      setWeather(null); //clear weather
    }
    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }, 100);
  };

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
    saveUserCity(suggestedName);
    try {
      const weatherResult = await getWeatherByCity(suggestedName);
      setWeather(weatherResult);
      setLocalWeatherData({
        name: weatherResult.name,
        country: weatherResult.sys.country,
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
  // Searchbar positioning
  useEffect(() => {
    if (!weather) {
      setSearchPosition("center");
    } else {
      setSearchPosition(isMobile ? "bottom" : "top");
    }
  }, [weather, isMobile]);

  // Active card reset
  useEffect(() => {
    setActiveCard(0);
  }, [weather]);

  const activeWeatherData =
    activeCard === 0 ? weather : forecast[activeCard - 1];

  return (
    <Container>
      <SearchWrapper position={searchPosition} ref={searchRef}>
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          handleFocus={handleInputFocus}
        />
        {cityNotFound && <p>City not found, try to input a part of name</p>}

        {suggestions !== undefined && suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            handleClick={handleSuggestionClick}
          />
        )}
        {!weather && (
          <UserSuggestions
            userSuggestions={userSuggestions}
            handleClick={handleSuggestionClick}
          />
        )}
      </SearchWrapper>

      {weather && (
        <WeatherWrapper>
          <WeatherCard weather={activeWeatherData} active={activeCard} />
        </WeatherWrapper>
      )}

      {weather && (
        <CatImageWrapper>
          <CatImage weather={activeWeatherData} size={"280px"} />
        </CatImageWrapper>
      )}

      {weather && forecast && (
        <ForecastWrapper>
          <ForecastSlider>
            {/* First item for current weather */}
            <div key={"f0"}>
              <ForecastCard
                forecastItem={weather}
                active={activeCard}
                setActive={setActiveCard}
                index={0}
              />
            </div>
            {/* Forecast items */}
            {forecast.map((item, index) => (
              <div key={`f${index + 1}`}>
                <ForecastCard
                  forecastItem={item}
                  active={activeCard}
                  setActive={setActiveCard}
                  index={index + 1}
                />
              </div>
            ))}
          </ForecastSlider>
        </ForecastWrapper>
      )}
    </Container>
  );
}

export default App;
