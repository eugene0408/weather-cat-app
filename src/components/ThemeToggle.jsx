import React from "react";
import styled from "styled-components";
import SunIcon from "../assets/sun.svg?react";
import MoonIcon from "../assets/moon.svg?react";
import { useTheme } from "../context/ThemeContext";

const ToggleButton = styled.button`
  position: absolute;
  bottom: 15%;
  right: 0;
  z-index: 1000;
  background: ${(props) => props.theme.colors.cardBackground};
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.colors.shadow};

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    transition: all 0.3s ease;
    height: 18px;
    width: 18px;
  }
  svg path,
  svg circle {
    stroke: ${(props) => props.theme.colors.text};
    opacity: 0.8;
  }
`;

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </ToggleButton>
  );
};
