import styled from "styled-components";
import { spin } from "../styles/animations";
import { weatherIcons } from "../assets/images";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  z-index: 999;
`;

const Image = styled.img`
  height: 120px;
  width: auto;
  animation: ${spin} 2s ease infinite;
`;

const sunIcon = weatherIcons.sunny;

export const Preloader = () => {
  return (
    <Wrapper>
      <Image src={sunIcon} alt="icon" />
    </Wrapper>
  );
};
