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

// Weather icons
import cloudIcon from "./weather/cloud.webp";
import fogIcon from "./weather/fog.webp";
import moonIcon from "./weather/moon.webp";
import rainIcon from "./weather/rain.webp";
import snowIcon from "./weather/snow.webp";
import sunnyIcon from "./weather/sunny.webp";
import thunderstormIcon from "./weather/thunderstorm.webp";

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

export const weatherIcons = {
  cloud: cloudIcon,
  fog: fogIcon,
  moon: moonIcon,
  rain: rainIcon,
  snow: snowIcon,
  sunny: sunnyIcon,
  thunderstorm: thunderstormIcon,
};

export const allImagesList = [
  ...Object.values(weatherIcons),
  ...Object.values(catImages),
];
