import styled from "styled-components";
import { useGame } from "../contexts/GameContext";

const Button = styled.button`
  background-color: var(--color-success);
  color: var(--color-light);
  outline: none;
  border: none;
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: var(--font-h4);
  transition: 0.2s all;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.8);
  }
`;

function StartGameButton() {
  const { dispatch } = useGame();
  return (
    <Button onClick={() => dispatch({ type: "startGame" })}>New Game</Button>
  );
}

export default StartGameButton;
