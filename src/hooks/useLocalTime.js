import { useWeather } from "../context/WeatherContext";

export const useLocalTime = () => {
  const { localWeatherData } = useWeather();
  return (dt) => {
    if (!localWeatherData.timezone) return "-";
    const utcTimeMs = dt * 1000;
    const cityTimeMs = utcTimeMs + localWeatherData.timezone * 1000;
    const cityTime = new Date(cityTimeMs);

    const hours = cityTime.getUTCHours().toString().padStart(2, "0");
    const minutes = cityTime.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };
};
