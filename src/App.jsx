import { useState } from "react";
import "./App.css";
import { SearchBar, WeatherIcon } from "./components";
import { Typography, Box, Grid, Stack, Button } from "@mui/material";

import {
  getWeatherByCity,
  searchSimilarCities,
  getForecastByCity,
} from "./services/weatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);

  const handleSearch = async () => {
    setWeather(null);
    setForecast(null);
    setSuggestions([]);
    try {
      // const [weatherResult, similarCities] = await Promise.all([
      //   getWeatherByCity(city),
      //   searchSimilarCities(city),
      // ]);
      // setWeather(weatherResult);
      // setSuggestions(similarCities);
      const similarCities = await searchSimilarCities(city);
      setSuggestions(similarCities);
      const weatherResult = await getWeatherByCity(city);
      setWeather(weatherResult);
      const forecastResult = await getForecastByCity(city);
      setForecast(forecastResult);

      // console.log(weatherResult);
      console.log(forecastResult);
    } catch (error) {
      setCityNotFound(true);
    }
  };

  const handleSuggestionClick = async (suggestedName) => {
    setCity(suggestedName);
    handleSearch();
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid>
          <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
        </Grid>
        {weather && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* ****** Result text ******  */}
            <Box>
              <Typography variant="h5">
                {weather.name} {weather.sys?.state} {weather.sys.country}
              </Typography>
              <Typography variant="h6">
                {weather.weather[0].descriotion}
              </Typography>
              <Typography variant="h3">
                {Math.round(weather.main.temp)}°C
              </Typography>
            </Box>
            {/* ******* Result icon ******* */}
            <Box>
              <WeatherIcon
                main={weather.weather[0].main}
                fallback={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
            </Box>
          </Box>
        )}

        {suggestions !== undefined && suggestions.length > 0 && (
          <Box>
            <Typography variant="h4">Similar places</Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {suggestions.map((item, index) => (
                <Button
                  key={`s${index}`}
                  variant="outlined"
                  onClick={() => handleSuggestionClick(item.name)}
                >
                  {item.name} {item?.state} {item.country}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        {forecast && (
          <Box>
            <Typography variant="h3">Forecast</Typography>
            {forecast.map((item, index) => (
              <Box key={`f${index}`}>
                <Typography variant="h5">
                  {new Date(item.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  - {Math.round(item.main.temp)}°C
                </Typography>
                <WeatherIcon
                  main={item.weather[0].main}
                  fallback={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
              </Box>
            ))}
          </Box>
        )}
      </Grid>
    </>
  );
}

export default App;
