import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [sunTimes, setSunTimes] = useState({ sunrise: null, sunset: null });
  return (
    <WeatherContext.Provider value={{ sunTimes, setSunTimes }}>
      {children}
    </WeatherContext.Provider>
  );
};
