import { useWeather } from "../context/WeatherContext";

const mapWeatherToIcon = (main, isDayTime) => {
  if (main === "Clear" && isDayTime) return "sunny";
  if (main === "Clear" && !isDayTime) return "moon";
  if (["Rain", "Drizzle"].includes(main)) return "rain";
  if (main === "Clouds") return "cloud";
  if (main === "Snow") return "snow";
  if (main === "Thunderstorm") return "thunderstorm";
  if (["Mist", "Smoke", "Haze", "Fog"].includes(main)) return "fog";
  return undefined;
};

export const WeatherIcon = ({ main, timestamp, fallback, size = "64px" }) => {
  const { localWeatherData } = useWeather();

  const getIsDayTime = () => {
    if (!localWeatherData.sunrise || !localWeatherData.sunset) return true; //default
    //return true if its day hours
    return timestamp >= localWeatherData.sunrise &&
      timestamp < localWeatherData.sunset
      ? true
      : false;
  };

  const isDayTime = getIsDayTime();

  const iconName = mapWeatherToIcon(main, isDayTime);

  return (
    <>
      {/* Use custom icon */}
      {iconName && (
        <img
          src={`icons/${iconName}.png`}
          alt={iconName}
          style={{ width: size, height: size }}
        />
      )}
      {/* Use default openweather icon */}
      {iconName === undefined && (
        <img src={fallback} alt="main" style={{ width: size, height: size }} />
      )}
    </>
  );
};
