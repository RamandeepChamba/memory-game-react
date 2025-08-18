import styled from "styled-components";

export const StyledHeader = styled.h1`
  display: inline-block;
  background-color: var(--color-secondary);
  color: var(--color-light);
  font-size: var(--font-h1);
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  text-transform: uppercase;

  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  margin-top: 4rem;
`;
function Header() {
  return <StyledHeader>Memory Game</StyledHeader>;
}

export default Header;
