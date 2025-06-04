import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  margin-top: 1em;
`;

const ItemButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font-size: 16px;
  &:hover {
    background: orange;
  }
`;

export const Suggestions = ({ suggestions, handleClick }) => {
  return (
    <Wrapper>
      {suggestions.map((item, index) => (
        <ItemButton onClick={() => handleClick(item.name)} key={`sug${index}`}>
          {item.name} {item?.state} {item.country}
        </ItemButton>
      ))}
    </Wrapper>
  );
};
