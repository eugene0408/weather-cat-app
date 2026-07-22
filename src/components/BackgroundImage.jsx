import React from "react";
import styled from "styled-components";

import { useTheme } from "../context/ThemeContext";

import { backgroundImages } from "../assets/images";

// Return string with image name
const mapBackgroundImages = (weather, isDarkTheme) => {
  const temp = Math.round(weather.main.temp);
  const main = weather.weather[0].main;
  const suffix = isDarkTheme ? "Dark" : "Light";

  switch (true) {
    case main === "Clear" && temp > 0 && temp < 25:
      return `clearSky${suffix}`;
    case main === "Clouds" && temp > 0:
      return `clouds${suffix}`;
    case ["Mist", "Smoke", "Haze", "Fog"].includes(main):
      return `fog${suffix}`;
    case ["Rain", "Drizzle"].includes(main):
      return `rain${suffix}`;
    case main === "Thunderstorm":
      return `thunderstorm${suffix}`;
    case main === "Snow":
      return `snowfall${suffix}`;
    case temp >= 25:
      return `hot${suffix}`;
    case temp <= 0 && temp >= -10:
      return `winter${suffix}`;
    case temp < -10:
      return `freezing${suffix}`;
  }
};

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const BackgroundImage = ({ weather }) => {
  const { isDark } = useTheme();
  const backgroundImageName = mapBackgroundImages(weather, isDark);
  return (
    <Image
      src={backgroundImages[backgroundImageName]}
      alt={backgroundImageName}
    />
  );
};
