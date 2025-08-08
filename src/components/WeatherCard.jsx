import styled from "styled-components";

import { useWeather } from "../context/WeatherContext";

import { useLiveClock } from "../hooks/useLiveClock";
import { useLocalTime } from "../hooks/useLocalTime";

import { WeatherIcon } from "./WeatherIcon";
import TimeIcon from "../assets/local-time.svg?react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 1em 0 1em 1em;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;
const Item = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  & h4,
  & h5,
  & span {
    margin: 0;
  }
  &:nth-of-type(1) {
    font-size: 32px;
    line-height: 1.2;
    font-weight: 700;
    opacity: 0.5;
  }
  &:nth-of-type(2) {
    font-size: 18px;
    font-weight: 300;
    line-height: 1;
  }
  &:nth-of-type(3) {
    font-size: 32px;
    font-weight: 700;
  }
`;

const IconWrapper = styled.div`
  --size: 120px;
  position: absolute;
  top: calc(-1 * var(--size) / 3);
  /* right: calc(-1 * var(--size) / 2); */
  right: -10px;
  height: var(--size);
  width: var(--size);
`;

const TimeWrapper = styled.div`
  position: absolute;
  right: 0.8em;
  bottom: 1em;
  display: flex;
  align-items: center;
  & svg {
    height: 1em;
    width: 1em;
    opacity: 0.3;
    margin-right: 0.2em;
  }
  & span {
    font-size: 16px;
    opacity: 0.9;
  }
`;

export const WeatherCard = ({ weather, active }) => {
  const liveTime = useLiveClock();
  const formatToLocalTime = useLocalTime();
  const localTime = formatToLocalTime(weather.dt);
  const current = active === 0 ? true : false;
  const { localWeatherData } = useWeather();
  return (
    <Wrapper>
      <Item>
        <h5>
          {localWeatherData.name} {localWeatherData.country}
        </h5>
      </Item>
      <Item>
        <span>{weather.weather[0].description}</span>
      </Item>
      <Item>
        <h4>{Math.round(weather.main.temp)}°C</h4>
      </Item>
      <IconWrapper>
        <WeatherIcon
          main={weather.weather[0].main}
          size={"100%"}
          timestamp={weather.dt}
          fallback={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
      </IconWrapper>
      <TimeWrapper>
        <TimeIcon />
        <span>{current ? liveTime : localTime.time}</span>
      </TimeWrapper>
    </Wrapper>
  );
};
