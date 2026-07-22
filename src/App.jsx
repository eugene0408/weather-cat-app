import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/globalStyles";
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
import { usePreloadImages } from "./hooks/usePreloadImages";

import { lightTheme, darkTheme } from "./styles/themes";

import { allImagesList } from "./assets/images";

import {
  SearchBar,
  Suggestions,
  UserSuggestions,
  WeatherCard,
  ForecastSlider,
  ForecastCard,
  CatImage,
  ThemeToggle,
  Preloader,
  BackgroundImage,
} from "./components";

import {
  Container,
  SearchWrapper,
  MainWrapper,
  WeatherWrapper,
  CatImageWrapper,
  ForecastWrapper,
  BgImageWrapper,
} from "./App.styles";
import { SiNushell } from "react-icons/si";

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
    defaultSuggestions,
  );

  const saveUserCity = (city) => {
    const updated = [city, ...userSuggestions.filter((c) => c != city)];
    setUserSuggestions(updated.slice(0, 6));
  };

  const { localWeatherData, setLocalWeatherData } = useWeather();
  const isMobile = useIsMobile();

  const clearInput = () => setCity("");
  const focusInput = () => setIsInputFocused(true);
  const clearWeather = () => setWeather(null);
  const scrollInputIntoView = () => {
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

  const handleInputFocus = () => {
    clearInput();
    focusInput();
    if (weather) {
      clearWeather();
    }
    scrollInputIntoView();
  };

  const handleSearch = async () => {
    if (localWeatherData.isDemo) {
      handleInputFocus();
      return;
    }
    if (!isInputFocused) {
      focusInput();
      clearWeather();
      scrollInputIntoView();
      setActiveCard(0);
    }
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
      const forecastResult = await getForecastByCity(suggestedName);

      setSuggestions([]);

      setTimeout(() => {
        setWeather(weatherResult);
        setLocalWeatherData({
          isDemo: false,
          name: weatherResult.name,
          id: weatherResult.id,
          country: weatherResult.sys.country,
          dt: weatherResult.dt,
          sunrise: weatherResult.sys.sunrise,
          sunset: weatherResult.sys.sunset,
          timezone: weatherResult.timezone,
        });
        setForecast(forecastResult);
      }, 100);

      // console.log("weather:", weatherResult, "forecast:", forecastResult);
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
    const demoForecast = demoData.forecast;

    setTimeout(() => {
      setWeather(demoWeather);
      setLocalWeatherData({
        isDemo: true,
        name: demoWeather.name,
        id: 999999,
        country: null,
        dt: demoWeather.dt,
        sunrise: demoWeather.sys.sunrise,
        sunset: demoWeather.sys.sunset,
        timezone: demoWeather.timezone,
      });
      setForecast(demoForecast);
      setSuggestions([]);
    }, 100);
  };

  // Active card reset
  useEffect(() => {
    setActiveCard(0);
  }, [weather]);

  const activeWeatherData =
    activeCard === 0 ? weather : forecast[activeCard - 1];

  const { isDark } = useTheme();
  const currentTheme = isDark ? darkTheme : lightTheme;

  const imagesLoaded = usePreloadImages(allImagesList);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      {!imagesLoaded && <Preloader />}
      <Container>
        <SearchWrapper $isActive={isInputFocused} ref={searchRef}>
          <SearchBar
            city={city}
            setCity={setCity}
            onSearch={handleSearch}
            handleFocus={handleInputFocus}
          />
          {cityNotFound && (
            <p style={{ width: "100%", textAlign: "center" }}>
              Location not found. Try typing part of the name.
            </p>
          )}
          {/* === Search suggestions === */}
          {suggestions !== undefined && suggestions.length > 0 && (
            <Suggestions
              suggestions={suggestions}
              handleClick={handleSuggestionClick}
            />
          )}
          {/* === Saved suggestions === */}
          {(!weather || !isMobile) && (
            <UserSuggestions
              userSuggestions={userSuggestions}
              handleClick={handleSuggestionClick}
              demoClick={demoModeHandler}
            />
          )}
        </SearchWrapper>

        {/* === Main weather & Images === */}
        {weather && (
          <MainWrapper>
            <BgImageWrapper>
              <BackgroundImage weather={activeWeatherData} />
            </BgImageWrapper>
            <WeatherWrapper>
              <WeatherCard weather={activeWeatherData} active={activeCard} />
            </WeatherWrapper>
            <CatImageWrapper>
              <CatImage weather={activeWeatherData} active={activeCard} />
              <ThemeToggle />
            </CatImageWrapper>
          </MainWrapper>
        )}
        {/* === Forecast Slider === */}
        {weather && forecast && (
          <ForecastWrapper>
            <ForecastSlider weather={weather}>
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
