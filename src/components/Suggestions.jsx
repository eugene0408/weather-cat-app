import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  margin-top: 1em;
  @media (min-width: 768px) {
    width: 80%;
  }
`;

const ItemButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  padding: 0.3em 0.5em;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    background: ${(props) => props.theme.colors.accent};
  }
  & span {
    opacity: 0.5;
    margin-left: 0.25em;
  }
`;

export const Suggestions = ({ suggestions, handleClick }) => {
  return (
    <Wrapper>
      {suggestions.map((item, index) => (
        <ItemButton onClick={() => handleClick(item.name)} key={`sug${index}`}>
          {item.name}
          <span>
            {item?.state} {item.country}
          </span>
        </ItemButton>
      ))}
    </Wrapper>
  );
};
