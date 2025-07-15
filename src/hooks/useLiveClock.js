import { useState, useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

// Return live time in selected city based on user browser time and openweather api timezone
export const useLiveClock = () => {
  const { localWeatherData } = useWeather();
  const timezoneOffset = localWeatherData?.timezone ?? 0;

  const getLocalTime = () => {
    const utcNow = Date.now();
    const localTimeMs = utcNow + timezoneOffset * 1000;
    const date = new Date(localTimeMs);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [liveTime, setLiveTime] = useState(getLocalTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTime(getLocalTime());
    }, 1000);
    return clearInterval(interval);
  }, [timezoneOffset]);

  return liveTime;
};
