import React from "react";
import styled from "styled-components";

import { useTheme } from "../context/ThemeContext";
import { useIsMobile } from "../hooks/useIsMobile";
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

const ImageContainer = styled.div`
  height: 100%;
  width: ${(props) => props.$width};
  position: absolute;
  top: 48%;
  left: ${(props) => props.$offset};
  overflow: visible;
  @media (min-width: 768px) {
    top: 10%;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const BackgroundImage = ({ weather }) => {
  const { isDark } = useTheme();
  const backgroundImageName = mapBackgroundImages(weather, isDark);
  const isMobile = useIsMobile();
  const containerWidth = isMobile ? 150 : 140;
  const containerOffset = (100 - containerWidth) / 2;
  return (
    <ImageContainer
      $width={`${containerWidth}%`}
      $offset={`${containerOffset}%`}
    >
      <Image
        src={backgroundImages[backgroundImageName]}
        alt={backgroundImageName}
      />
    </ImageContainer>
  );
};
