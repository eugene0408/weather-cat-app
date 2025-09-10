import styled from "styled-components";
import { useWeather } from "../context/WeatherContext";
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
  box-shadow: ${(props) => props.theme.colors.cardShadow};
  overflow: visible;
  position: relative;
  margin: 0;
  cursor: pointer;
  background: ${(props) =>
    props.$active
      ? props.theme.colors.activeCardBackground
      : props.theme.colors.cardBackground};
  @media (hover: hover) {
    &:hover {
      background: ${(props) =>
        props.active
          ? props.theme.colors.activeCardBackground
          : props.theme.colors.hoverCardBackground};
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
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

  const { localWeatherData } = useWeather();
  const isDemo = localWeatherData.isDemo;

  const main = forecastItem.weather[0].main;
  const description = forecastItem.weather[0].description;
  const temperature = Math.round(forecastItem.main.temp);
  const timestamp = forecastItem.dt;
  const fallbackImgUrl = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`;

  // Slice long words and text of description
  const truncateWords = (text) => {
    const truncatedWords = text
      .split(" ")
      .map((word) => {
        if (word.length > 8) {
          return word.slice(0, 8) + ".";
        }
        return word;
      })
      .join(" ");
    if (truncatedWords.length > 16) return truncatedWords.slice(0, 16) + "...";
    return truncatedWords;
  };

  return (
    <Container>
      <CardWrapper $active={isActive} onClick={() => setActive(index)}>
        <TextWrapper>
          {/* Use live clock for current (first) item or use static time for demo mode & forecast items */}
          <Time>{isCurrent && !isDemo ? liveTime : localTime.time}</Time>
          <Date>{localTime.date}</Date>
        </TextWrapper>
        <IconWrapper>
          <WeatherIcon
            main={main}
            size="100%"
            timestamp={timestamp}
            fallback={fallbackImgUrl}
          />
        </IconWrapper>
        <TextWrapper>
          <Weather>{truncateWords(description)}</Weather>
          <Temperature>{temperature}°C</Temperature>
        </TextWrapper>
      </CardWrapper>
    </Container>
  );
};
