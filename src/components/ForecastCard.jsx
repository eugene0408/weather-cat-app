import styled from "styled-components";
import { useLocalTime } from "../hooks/useLocalTime";
import { WeatherIcon } from "./WeatherIcon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CardWrapper = styled.div`
  --width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 220px;
  width: var(--width);
  border-radius: calc(var(--width) / 2);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  overflow: visible;
  position: relative;
  margin: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  /* position: absolute;
  left: 0;
  top: -20%; */
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 50%; */
  /* height: 50%; */
  width: 100%;
  /* padding-bottom: 1em; */
`;

const Weather = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 300;
  text-align: center;
  min-height: calc(1.2em * 2);
  opacity: 0.7;
  margin: 0;
`;

const Temperature = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
`;

const Time = styled.p`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;
  margin: 0;
`;

const Date = styled.p`
  font-size: 12px;
  font-weight: 400;
  opacity: 1;
  margin: 0;
`;

export const ForecastCard = ({ forecastItem }) => {
  const formatToLocalTime = useLocalTime();
  const localTime = formatToLocalTime(forecastItem.dt);

  return (
    <Container>
      <CardWrapper>
        <TextWrapper>
          <Time>{localTime.time}</Time>
          <Date>{localTime.date}</Date>
        </TextWrapper>
        <IconWrapper>
          <WeatherIcon
            main={forecastItem.weather[0].main}
            size="100%"
            timestamp={forecastItem.dt}
            fallback={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}
          />
        </IconWrapper>
        <TextWrapper>
          <Weather>{forecastItem.weather[0].description}</Weather>
          <Temperature>{Math.round(forecastItem.main.temp)}°C</Temperature>
        </TextWrapper>
      </CardWrapper>
    </Container>
  );
};
