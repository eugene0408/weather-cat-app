import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.2em;
  width: 100%;
  margin-top: 1rem;
  @media (min-width: 768px) {
    /* width: 80%; */
  }
`;
const ItemButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 0.5em 1em;
  font-weight: 400;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.cardBackground};
  box-shadow: ${(props) => props.theme.colors.shadow};
  cursor: pointer;
`;

export const UserSuggestions = ({
  userSuggestions,
  handleClick,
  demoClick,
}) => {
  return (
    <Wrapper>
      {userSuggestions.map((item, index) => (
        <ItemButton onClick={() => handleClick(item)} key={`us${index}`}>
          {item}
        </ItemButton>
      ))}
      <ItemButton onClick={() => demoClick()} key={`us999`}>
        Demo Mode
      </ItemButton>
    </Wrapper>
  );
};
