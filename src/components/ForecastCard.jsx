import styled from "styled-components";
import { useLocalTime } from "../hooks/useLocalTime";
import { useLiveClock } from "../hooks/useLiveClock";
import { WeatherIcon } from "./WeatherIcon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CardWrapper = styled.div`
  --width: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 220px;
  width: var(--width);
  border-radius: calc(var(--width) / 2);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  overflow: visible;
  position: relative;
  margin: 0;
  cursor: pointer;
  background: ${(props) =>
    props.active
      ? "linear-gradient(45deg,rgba(102, 224, 209, 1) 0%, rgba(87, 159, 241, 1) 100%)"
      : "transparent"};
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
  width: 100%;
  padding: 0 0.2em;
  box-sizing: border-box;
`;

const Weather = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
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
  margin-top: 1em;
  margin-bottom: 0;
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

export const ForecastCard = ({ forecastItem, active, setActive, index }) => {
  const formatToLocalTime = useLocalTime();
  const localTime = formatToLocalTime(forecastItem.dt);
  const liveTime = useLiveClock();

  const isActive = active === index ? true : false;
  const isCurrent = index === 0 ? true : false;

  return (
    <Container>
      <CardWrapper active={isActive} onClick={() => setActive(index)}>
        <TextWrapper>
          <Time>{isCurrent ? liveTime : localTime.time}</Time>
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
