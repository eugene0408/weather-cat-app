import { useWeather } from "../context/WeatherContext";

import sunny from "../assets/icons/sunny.webp";
import moon from "../assets/icons/moon.webp";
import rain from "../assets/icons/rain.webp";
import cloud from "../assets/icons/cloud.webp";
import snow from "../assets/icons/snow.webp";
import thunderstorm from "../assets/icons/thunderstorm.webp";
import fog from "../assets/icons/fog.webp";

const mapWeatherToIcon = (main, isDayTime) => {
  if (main === "Clear" && isDayTime) return sunny;
  if (main === "Clear" && !isDayTime) return moon;
  if (["Rain", "Drizzle"].includes(main)) return rain;
  if (main === "Clouds") return cloud;
  if (main === "Snow") return snow;
  if (main === "Thunderstorm") return thunderstorm;
  if (["Mist", "Smoke", "Haze", "Fog"].includes(main)) return fog;
  return sunny;
};

export const WeatherIcon = ({ main, timestamp, fallback, size = "64px" }) => {
  const { localWeatherData } = useWeather();
  // Current day
  const todayDate = new Date(
    (localWeatherData.dt + localWeatherData.timezone) * 1000
  );
  // Forecast day
  const forecastDate = new Date((timestamp + localWeatherData.timezone) * 1000);

  // Return sunrise & sunset timestamps considering days shift
  const getShiftedSunTimes = (daysShift = 0) => {
    const SECONDS_IN_DAY = 86400;

    return {
      sunrise: localWeatherData.sunrise + SECONDS_IN_DAY * daysShift,
      sunset: localWeatherData.sunset + SECONDS_IN_DAY * daysShift,
    };
  };

  // Return diffrence in full days
  const dayShift = () => {
    const msPerDay = 24 * 60 * 60 * 1000;

    forecastDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);

    const diff = (forecastDate - todayDate) / msPerDay;

    return Math.floor(diff);
  };

  //Return true if its day hours
  const getIsDayTime = () => {
    if (!localWeatherData.sunrise || !localWeatherData.sunset) return true; //default
    const { sunrise, sunset } = getShiftedSunTimes(dayShift());
    return timestamp >= sunrise && timestamp < sunset ? true : false;
  };

  const isDayTime = getIsDayTime();

  const iconSrc = mapWeatherToIcon(main, isDayTime);

  return (
    <>
      {/* Use custom icon */}
      {iconSrc && (
        <img
          src={iconSrc}
          alt={"weather-icon"}
          style={{ width: size, height: size }}
        />
      )}
      {/* Use default openweather icon */}
      {iconSrc === undefined && (
        <img
          src={fallback}
          alt="weather-icon"
          style={{ width: size, height: size }}
        />
      )}
    </>
  );
};
