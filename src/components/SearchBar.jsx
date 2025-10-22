import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import { MdPlayArrow } from "react-icons/md";

const Wrapper = styled.div`
  min-width: 240px;
  width: 100%;
  height: 50px;
  position: relative;
  @media (min-width: 768px) {
    /* width: 80%; */
  }
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  max-width: 100%;
  border: none;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.colors.shadow};
  font-size: 18px;
  font-weight: 400;
  padding: 0 2.5em;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.cardBackground};

  &:focus,
  &:hover {
    outline: none;
  }
`;

const StyledLocationIcon = styled(FaLocationDot)`
  position: absolute;
  left: 0.8em;
  top: 50%;
  transform: translateY(-50%);
  height: 2.5em;
  opacity: 0.3;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 0 10px 10px 0;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  background-color: ${(props) => props.theme.colors.accent};
  & svg {
    height: 1.7em;
    width: 1.7em;
  }
`;

export const SearchBar = ({ city, setCity, onSearch, handleFocus }) => {
  return (
    <Wrapper>
      <StyledLocationIcon />
      <Input
        value={city}
        placeholder="Type a location"
        onChange={(e) => setCity(e.target.value)}
        onFocus={() => handleFocus()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <ActionButton onClick={onSearch}>
        <MdPlayArrow />
      </ActionButton>
    </Wrapper>
  );
};
