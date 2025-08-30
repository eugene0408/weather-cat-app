const mapCatImage = (weather) => {
  const temp = Math.round(weather.main.temp);
  const main = weather.weather[0].main;

  if (["Rain", "Drizzle", "Thunderstorm"].includes(main)) return "rain";
  if (["Mist", "Fog"].includes(main)) return "fog";
  if (main === "Clouds") return "cloudy";
  if (temp < 5) return "cold";
  if (temp < 25) return "sunny";
  if (temp >= 25) return "hot";
};

export const CatImage = ({ weather, size }) => {
  const catImage = mapCatImage(weather);
  return (
    <img
      src={`images/${catImage}.png`}
      alt={`${catImage}-cat`}
      style={{ height: size }}
    />
  );
};
