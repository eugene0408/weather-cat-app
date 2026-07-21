// Cats images
import cloudyCold2 from "./cats/cloudy-cold2@1x.webp";
import cloudyCold from "./cats/cloudy-cold@1x.webp";
import cloudy3 from "./cats/cloudy3@1x.webp";
import cloudy from "./cats/cloudy@1x.webp";
import cold2 from "./cats/cold2@1x.webp";
import cold3 from "./cats/cold3@1x.webp";
import cold from "./cats/cold@1x.webp";
import cool from "./cats/cool@1x.webp";
import fog from "./cats/fog@1x.webp";
import hot2 from "./cats/hot2@1x.webp";
import hot from "./cats/hot@1x.webp";
import rain from "./cats/rain@1x.webp";
import storm from "./cats/storm@1x.webp";
import sunny from "./cats/sunny@1x.webp";

// Cats images 2x
import cloudyCold2_2x from "./cats/cloudy-cold2@2x.webp";
import cloudyCold_2x from "./cats/cloudy-cold@2x.webp";
import cloudy3_2x from "./cats/cloudy3@2x.webp";
import cloudy_2x from "./cats/cloudy@2x.webp";
import cold2_2x from "./cats/cold2@2x.webp";
import cold3_2x from "./cats/cold3@2x.webp";
import cold_2x from "./cats/cold@2x.webp";
import cool_2x from "./cats/cool@2x.webp";
import fog_2x from "./cats/fog@2x.webp";
import hot2_2x from "./cats/hot2@2x.webp";
import hot_2x from "./cats/hot@2x.webp";
import rain_2x from "./cats/rain@2x.webp";
import storm_2x from "./cats/storm@2x.webp";
import sunny_2x from "./cats/sunny@2x.webp";

// Weather icons
import cloudIcon from "./weather/cloud.webp";
import fogIcon from "./weather/fog.webp";
import moonIcon from "./weather/moon.webp";
import rainIcon from "./weather/rain.webp";
import snowIcon from "./weather/snow.webp";
import sunnyIcon from "./weather/sunny.webp";
import thunderstormIcon from "./weather/thunderstorm.webp";

// Backgrounds
import clearSkyLight from "./backgrounds/clear-sky-light.png";
import clearSkyDark from "./backgrounds/clear-sky-dark.png";
import cloudsLight from "./backgrounds/clouds-light.png";
import cloudsDark from "./backgrounds/clouds-dark.png";
import rainLight from "./backgrounds/rain-light.png";
import rainDark from "./backgrounds/rain-dark.png";
import thunderstormLight from "./backgrounds/thunderstorm-light.png";
import thunderstormDark from "./backgrounds/thunderstorm-dark.png";
import hotLight from "./backgrounds/hot-light.png";
import hotDark from "./backgrounds/hot-dark.png";
import winterLight from "./backgrounds/winter-light.png";
import winterDark from "./backgrounds/winter-dark.png";
import snowfallLight from "./backgrounds/snowfall-light.png";
import snowfallDark from "./backgrounds/snowfall-dark.png";
import freezingLight from "./backgrounds/freezing-light.png";
import freezingDark from "./backgrounds/freezing-dark.png";
import fogLight from "./backgrounds/fog-light.png";
import fogDark from "./backgrounds/fog-dark.png";

export const catImages = {
  cloudyCold2,
  cloudyCold,
  cloudy3,
  cloudy,
  cold2,
  cold3,
  cold,
  cool,
  fog,
  hot2,
  hot,
  rain,
  storm,
  sunny,
};

export const catImages2x = {
  cloudyCold2: cloudyCold2_2x,
  cloudyCold: cloudyCold_2x,
  cloudy3: cloudy3_2x,
  cloudy: cloudy_2x,
  cold2: cold2_2x,
  cold3: cold3_2x,
  cold: cold_2x,
  cool: cool_2x,
  fog: fog_2x,
  hot2: hot2_2x,
  hot: hot_2x,
  rain: rain_2x,
  storm: storm_2x,
  sunny: sunny_2x,
};

export const allCatsImages = {
  cloudyCold2: { "1x": cloudyCold2, "2x": cloudyCold2_2x },
  cloudyCold: { "1x": cloudyCold, "2x": cloudyCold_2x },
  cloudy3: { "1x": cloudy3, "2x": cloudy3_2x },
  cloudy: { "1x": cloudy, "2x": cloudy_2x },
  cold2: { "1x": cold2, "2x": cold2_2x },
  cold3: { "1x": cold3, "2x": cold3_2x },
  cold: { "1x": cold, "2x": cold_2x },
  cool: { "1x": cool, "2x": cool_2x },
  fog: { "1x": fog, "2x": fog_2x },
  hot2: { "1x": hot2, "2x": hot2_2x },
  hot: { "1x": hot, "2x": hot_2x },
  rain: { "1x": rain, "2x": rain_2x },
  storm: { "1x": storm, "2x": storm_2x },
  sunny: { "1x": sunny, "2x": sunny_2x },
};

export const weatherIcons = {
  cloud: cloudIcon,
  fog: fogIcon,
  moon: moonIcon,
  rain: rainIcon,
  snow: snowIcon,
  sunny: sunnyIcon,
  thunderstorm: thunderstormIcon,
};

export const backgroundImages = {
  clearSkyLight,
  clearSkyDark,
  cloudsLight,
  cloudsDark,
  rainDark,
  rainLight,
  thunderstormDark,
  thunderstormLight,
  hotLight,
  hotDark,
  winterLight,
  winterDark,
  snowfallLight,
  snowfallDark,
  freezingLight,
  freezingDark,
  fogLight,
  fogDark,
};

export const allImagesList = [
  ...Object.values(weatherIcons),
  ...Object.values(catImages),
  ...Object.values(catImages2x),
];
