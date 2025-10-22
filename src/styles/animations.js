import { keyframes } from "styled-components";

export const zoomIn = keyframes`
  from {transform: scale(1.1);}
  to {transform: scale(1)}
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
