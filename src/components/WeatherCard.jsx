import styled from "styled-components";
import { WeatherIcon } from "./WeatherIcon";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80%;
  margin-top: 5em;
  padding-left: 0.8em;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
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
    font-size: 36px;
    font-weight: 700;
    opacity: 0.5;
  }
  &:nth-of-type(2) {
    font-size: 24px;
    font-weight: 300;
  }
  &:nth-of-type(3) {
    font-size: 40px;
    font-weight: 700;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: -50%;
  right: -20%;
  height: 180px;
  width: 180px;
`;

export const WeatherCard = ({ weather }) => {
  return (
    <Wrapper>
      <Item>
        <h5>
          {weather.name} {weather.sys?.state} {weather.sys.country}
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
    </Wrapper>
  );
};
