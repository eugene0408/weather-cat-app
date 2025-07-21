import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.2em;
  width: 100%;
  margin-top: 1rem;
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
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const UserSuggestions = ({ userSuggestions, handleClick }) => {
  return (
    <Wrapper>
      {userSuggestions.map((item, index) => (
        <ItemButton onClick={() => handleClick(item)} key={`us${index}`}>
          {item}
        </ItemButton>
      ))}
    </Wrapper>
  );
};
