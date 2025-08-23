import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [localWeatherData, setLocalWeatherData] = useState({
    name: "",
    country: "",
    dt: null,
    sunrise: null,
    sunset: null,
    timezone: null,
    isDemo: false,
  });
  return (
    <WeatherContext.Provider value={{ localWeatherData, setLocalWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};
