import styled, { css } from "styled-components";
import Card from "./Card";
import { respond } from "../styles/mixins";
import { useGame } from "../contexts/GameContext";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 550px;
  width: 550px;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 2rem;
  height: 70vh;
  overflow: auto;

  ${respond.phone(css`
    width: 100%;
    gap: 5px;
  `)}
`;

function CardLayout() {
  const {
    state: { cards },
  } = useGame();

  return cards.length > 0 ? (
    <CardGrid>
      {cards.map((card, i) => (
        <Card key={i} card={card} index={i} />
      ))}
    </CardGrid>
  ) : null;
}

export default CardLayout;
