import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
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
// import { useIsMobile } from "./hooks/useIsMobile";

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

import {
  Container,
  SearchWrapper,
  MainWrapper,
  WeatherWrapper,
  CatImageWrapper,
  ForecastWrapper,
} from "./App.styles";

function App() {
  const searchRef = useRef(null);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(true);

  const [userSuggestions, setUserSuggestions] = useLocalStorage(
    "cities",
    defaultSuggestions
  );

  const saveUserCity = (city) => {
    const updated = [city, ...userSuggestions.filter((c) => c != city)];
    setUserSuggestions(updated.slice(0, 8));
  };

  const { setLocalWeatherData } = useWeather();
  // const isMobile = useIsMobile();

  const handleInputFocus = () => {
    setCity(""); //clear input
    setIsInputFocused(true);
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
    setIsInputFocused(false);
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
        isDemo: false,
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
    setIsInputFocused(false);
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
      isDemo: true,
    });
    const demoForecast = demoData.forecast;
    setForecast(demoForecast);
    setSuggestions([]);
  };

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
        <SearchWrapper $isActive={isInputFocused} ref={searchRef}>
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
          <MainWrapper>
            <WeatherWrapper>
              <WeatherCard weather={activeWeatherData} active={activeCard} />
            </WeatherWrapper>
            <CatImageWrapper>
              <CatImage weather={activeWeatherData} />
              <ThemeToggle />
            </CatImageWrapper>
          </MainWrapper>
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
