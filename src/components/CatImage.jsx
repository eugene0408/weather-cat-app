const mapCatImage = (weather) => {
  const temp = Math.round(weather.main.temp);
  const main = weather.weather[0].main;

  switch (true) {
    case ["Rain", "Drizzle"].includes(main):
      return "rain";
    case main === "Thunderstorm":
      return "storm";
    case ["Mist", "Smoke", "Haze", "Fog"].includes(main):
      return "fog";
    case main === "Clouds" && temp > 0:
      return "cloudy";
    case temp < 0 && temp > -5:
      return "cold";
    case temp < -5 && temp >= -10:
      return "cold2";
    case temp < -10:
      return "cold3";
    case temp < 25:
      return "sunny";
    case temp >= 25:
      return "hot";
    default:
      return "sunny";
  }
};

export const CatImage = ({ weather }) => {
  const catImage = mapCatImage(weather);
  return (
    <img
      src={`images/${catImage}.png`}
      alt={`${catImage}-weather-cat`}
      style={{ height: "100%" }}
    />
  );
};
