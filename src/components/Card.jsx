import styled, { css } from "styled-components";
import CardBackImg from "../assets/card-back.avif";
import Apple from "../assets/apple.jpg";
import Banana from "../assets/banana.png";
import Grape from "../assets/grape.avif";
import Mango from "../assets/mango.png";
import Peach from "../assets/peach.avif";
import Pineapple from "../assets/pineapple.avif";
import Strawberry from "../assets/strawberry.png";
import Watermelon from "../assets/watermelon.png";
import { useGame } from "../contexts/GameContext";

// Images
// indices of the following array is mapped to shuffled card values, like 1 = apple, 2 = banana
const images = [
  Apple,
  Banana,
  Grape,
  Mango,
  Peach,
  Pineapple,
  Strawberry,
  Watermelon,
];

const CardContainer = styled.div`
  perspective: 1000px;

  .card {
    background-color: #fff;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    position: relative;
    cursor: pointer;
    transition: 0.2s all;
    border: 2px solid #444;

    ${(props) =>
      props.$isFacedUp &&
      css`
        transform: rotateY(-180deg);
      `}
  }
  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-position: center;
  }
  .back {
    background-image: url(${CardBackImg});
    background-size: cover;
  }
  .front {
    ${(props) => css`
      background-image: url(${images[props.$cardValue - 1]});
      background-size: contain;
      background-repeat: no-repeat;
      transform: rotateY(180deg);
    `}
  }
`;

function Card({ card, index }) {
  const { state, dispatch } = useGame();

  function handleClick() {
    if (state.status === "cardsDidNotMatch") return;
    // If a card is clicked for first time
    if (!state.firstCardClicked) {
      // - start timer
      const intervalRef = setInterval(function () {
        dispatch({ type: "increaseTimer" });
      }, 1000);
      // - store interval ref so we can stop it when game ends
      dispatch({ type: "timerStarted", payload: intervalRef });
    }
    dispatch({ type: "cardClicked", payload: index });
  }

  return (
    <CardContainer
      $cardValue={card.value}
      $isFacedUp={card.isFacedUp}
      onClick={handleClick}
    >
      <div className="card">
        <div className="face back"></div>
        <div className="face front"></div>
      </div>
    </CardContainer>
  );
}

export default Card;
