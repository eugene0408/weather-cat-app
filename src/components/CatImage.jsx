const mapCatImage = (weather) => {
  const temp = Math.round(weather.main.temp);
  const main = weather.weather[0].main;

  switch (true) {
    // Rain
    case ["Rain", "Drizzle"].includes(main):
      return "rain";
    // Storm
    case main === "Thunderstorm":
      return "storm";
    // Mist
    case ["Mist", "Smoke", "Haze", "Fog"].includes(main):
      return "fog";
    // Clouds
    case main === "Clouds" && temp > 0 && temp <= 5:
      return "cloudy-cold2";
    case main === "Clouds" && temp > 5 && temp <= 12:
      return "cloudy-cold";
    case main === "Clouds" && temp > 12:
      return "cloudy";
    // Cold
    case temp < 0 && temp > -5:
      return "cold";
    case temp < -5 && temp >= -10:
      return "cold2";
    case temp < -10:
      return "cold3";
    // Warm & Clear
    case temp <= 10:
      return "cool";
    case temp < 18:
      return "sunny";
    case temp < 25:
      return "hot";
    case temp >= 25:
      return "hot2";
    default:
      return "sunny";
  }
};

export const CatImage = ({ weather }) => {
  const catImage = mapCatImage(weather);
  const image1x = new URL(
    `../assets/images/${catImage}@1x.webp`,
    import.meta.url
  ).href;
  const image2x = new URL(
    `../assets/images/${catImage}@2x.webp`,
    import.meta.url
  ).href;

  return (
    <img
      src={image1x}
      srcSet={`${image1x} 1x, ${image2x} 2x`}
      alt={`${catImage}-cat`}
      style={{ height: "100%", width: "auto", objectFit: "contain" }}
    />
  );
};
