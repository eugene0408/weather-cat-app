import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherByCity = async (city) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "en",
    },
  });
  return response.data;
};

export const searchSimilarCities = async (city) => {
  const response = await axios.get(GEO_URL, {
    params: {
      q: city,
      limit: 5,
      appid: API_KEY,
    },
  });
  return response.data;
};

export const getForecastByCity = async (city) => {
  const response = await axios.get(FORECAST_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data.list.slice(0, 15);
};
