import { keyframes } from "styled-components";

export const zoomIn = keyframes`
  0% {transform: scale(1.1);}
  50% {transform: scale(0.9)}
  100% {transform: scale(1)}
`;

export const spin = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

export const popInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(70%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1); 
  }
`;
