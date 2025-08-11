import { createGlobalStyle } from "styled-components";

import MontserratRegular from "./assets/fonts/montserrat-v30-cyrillic_cyrillic-ext_latin_latin-ext-regular.woff2";
import MontserratThin from "./assets/fonts/montserrat-v30-cyrillic_cyrillic-ext_latin_latin-ext-300.woff2";
import MontserratBold from "./assets/fonts/montserrat-v30-cyrillic_cyrillic-ext_latin_latin-ext-700.woff2";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Montserrat";
    src: url(${MontserratRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Montserrat";
    src: url(${MontserratThin}) format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Montserrat";
    src: url(${MontserratBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    font-family: "Montserrat", system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.colors.background};
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
  }
`;
