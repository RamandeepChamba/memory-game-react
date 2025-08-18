import styled from "styled-components";
import { useGame } from "../contexts/GameContext";
import StartGameButton from "./StartGameButton";
import Timer from "./Timer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

function StatsAndNew() {
  const { state } = useGame();
  return (
    <Container>
      {/* Moves */}
      <div>
        <p>
          <strong>Moves: </strong>
          <span>{state.movesCount}</span>
        </p>
      </div>
      <StartGameButton />
      {/* Timer */}
      <Timer />
    </Container>
  );
}

export default StatsAndNew;
