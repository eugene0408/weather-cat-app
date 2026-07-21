import styled, { keyframes } from "styled-components";

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

const cloudsAnimation = keyframes`
  100% {left:var(--l,105%)}
`;

const Loader = styled.div`
  width: 160px;
  height: 80px;
  position: relative;
  overflow: hidden;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 4px;
    left: -40px;
    width: 36px;
    height: 20px;
    --c: radial-gradient(farthest-side, #fff 96%, #0000);
    background:
      var(--c) 100% 100% /30% 60%,
      var(--c) 70% 0 /50% 100%,
      var(--c) 0 100% /36% 68%,
      var(--c) 27% 18% /26% 40%,
      linear-gradient(#fff 0 0) bottom/67% 58%;
    background-repeat: no-repeat;
    animation: ${cloudsAnimation} 2s linear infinite;
  }
  &::after {
    top: 15px;
    --l: 200%;
  }
`;

export const Preloader = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};
