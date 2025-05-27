import React from "react";

const mapWeatherToIcon = (main, fallback) => {
  switch (main) {
    case "Clear":
      return "sunny";
    case "Rain":
    case "Drizzle":
      return "rain";
    case "Clouds":
      return "cloud";
    case "Snow":
      return "snow";
    case "Thunderstorm":
      return "thunderstorm";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Fog":
      return "fog";
    default:
      return fallback;
  }
};

export const WeatherIcon = ({ main }) => {
  const iconName = mapWeatherToIcon(main);
  return (
    <img
      src={`icons/${iconName}.png`}
      alt="main"
      style={{ width: 64, height: 64 }}
    />
  );
};
