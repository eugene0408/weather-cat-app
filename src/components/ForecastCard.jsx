import styled from "styled-components";
import { useLocalTime } from "../hooks/useLocalTime";
import { WeatherIcon } from "./WeatherIcon";

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  width: 120px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  overflow: visible;
  position: relative;
  margin: 0 0.5em;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: -50%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  height: 50%;
  width: 100%;
  padding-bottom: 1em;
`;

const Weather = styled.p`
  font-size: 16px;
  font-weight: 300;
  opacity: 0.7;
  margin: 0;
`;

const Temperature = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
`;

const Time = styled.p`
  font-size: 16px;
  font-weight: 400;
  opacity: 0.7;
  margin: 0;
`;

export const ForecastCard = ({ forecastItem }) => {
  const formatToLocalTime = useLocalTime();
  const localTime = formatToLocalTime(forecastItem.dt);

  return (
    <CardWrapper>
      <IconWrapper>
        <WeatherIcon
          main={forecastItem.weather[0].main}
          size="120px"
          timestamp={forecastItem.dt}
          fallback={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}
        />
      </IconWrapper>
      <TextWrapper>
        <Weather>{forecastItem.weather[0].description}</Weather>
        <Temperature>{Math.round(forecastItem.main.temp)}°C</Temperature>
        <Time>{localTime}</Time>
      </TextWrapper>
    </CardWrapper>
  );
};
