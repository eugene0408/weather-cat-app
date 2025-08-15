import { useEffect, useState, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import useLocalStorage from "use-local-storage";

import defaultSuggestions from "./data/suggestions.json";
import demoData from "./data/demo.json";

import {
  getWeatherByCity,
  searchSimilarCities,
  getForecastByCity,
} from "./services/weatherApi";

import { useWeather } from "./context/WeatherContext";
import { useTheme } from "./context/ThemeContext";
import { useIsMobile } from "./hooks/useIsMobile";

import { lightTheme, darkTheme } from "./themes";

import {
  SearchBar,
  Suggestions,
  UserSuggestions,
  WeatherCard,
  ForecastSlider,
  ForecastCard,
  CatImage,
  ThemeToggle,
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
  color: ${(props) => props.theme.colors.text};

  @media (min-width: 420px) {
    max-width: 356px;
  }
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
    padding-top: 8rem;
  }
  /* @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 960px;
  }
  @media (min-width: 1400px) {
    max-width: 960px;
  } */
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
    props.$position === "top" &&
    `
      left: 0;
      top: 1rem;
      transform: none;
    `}
  ${(props) =>
    props.$position === "bottom" &&
    `
      top: auto;
      left: 0;
      bottom: 10px;
      transform: none;
    `}
  @media (min-width: 768px) {
    width: 80%;
  }
`;

const WeatherWrapper = styled.main`
  margin-top: 1.5rem;
  width: 100%;
  z-index: 1;
  @media (min-width: 768px) {
    width: 80%;
    align-self: flex-start;
  }
  @media (min-width: 992px) {
    width: 60%;
  }
`;

const CatImageWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: -3rem;
  width: 100%;
  z-index: 2;
  position: relative;
`;

const ForecastWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -2rem;
  width: 95%;
`;

function App() {
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
    if (weather) {
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
        dt: weatherResult.dt,
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

  const demoModeHandler = () => {
    setCityNotFound(false);
    setCity("Demo Mode");
    const demoWeather = demoData.weather;
    setWeather(demoWeather);
    setLocalWeatherData({
      name: demoWeather.name,
      country: null,
      dt: demoWeather.dt,
      sunrise: demoWeather.sys.sunrise,
      sunset: demoWeather.sys.sunset,
      timezone: demoWeather.timezone,
    });
    const demoForecast = demoData.forecast;
    setForecast(demoForecast);
    setSuggestions([]);
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

  const { isDark } = useTheme();
  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Container>
        <SearchWrapper $position={searchPosition} ref={searchRef}>
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
              demoClick={demoModeHandler}
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
            <ThemeToggle />
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
    </ThemeProvider>
  );
}

export default App;
