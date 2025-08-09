import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WeatherProvider } from "./context/WeatherContext.jsx";
import { CustomThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomThemeProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </CustomThemeProvider>
  </StrictMode>
);
