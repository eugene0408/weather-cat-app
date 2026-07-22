import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  gap: 16px;
  padding: 16px;
  margin: 0 auto;
  box-sizing: border-box;
  height: 100dvh;
  max-width: 768px;
  /* min-height: 100vh; */
  color: ${(props) => props.theme.colors.text};
  overflow: visible;

  @media (min-width: 420px) {
    max-width: 356px;
  }
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
    padding-top: 8rem;
  }
`;

export const SearchWrapper = styled.div`
  position: absolute;
  width: 100%;
  padding: 1rem;
  left: 0;
  top: ${(props) => (props.$isActive ? "50%" : "auto")};
  bottom: ${(props) => (props.$isActive ? "auto" : "10px")};
  transform: ${(props) => (props.$isActive ? "translateY(-50%)" : "none")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s ease;
  @media (min-width: 768px) {
    top: ${(props) => (props.$isActive ? "50%" : "1em")};
    bottom: auto;
    align-items: flex-end;
  }
`;

export const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2.5rem;
  width: 100%;
  position: relative;
  overflow: visible;
  height: 340px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    height: 340px;
    margin-top: 4em;
    width: 100%;
  }
`;

export const BgImageWrapper = styled.div`
  height: 100%;
  --width: 120%;
  width: var(--width);
  position: absolute;
  top: 55%;
  left: calc((100% - var(--width)) / 2);
  overflow: visible;
  @media (min-width: 768px) {
    top: 10%;
    --width: 140%;
  }
`;

export const WeatherWrapper = styled.div`
  width: 100%;
  z-index: 1;
  @media (min-width: 768px) {
    height: 100%;
    width: 65%;
    align-self: flex-end;
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    width: 60%;
  }
`;

export const CatImageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 0;
  z-index: 2;
  position: absolute;
  --offset: 12%;
  left: calc(var(--offset) * -1);
  bottom: 0;
  width: calc(var(--offset) + 100%);
  height: 230px;
  @media (min-width: 768px) {
    position: absolute;
    top: 0;
    left: -2em;
    justify-content: flex-start;
    height: 300px;
  }
`;

export const ForecastWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -2rem;
  width: 95%;
  @media (min-width: 768px) {
    width: 100%;
  }
`;
