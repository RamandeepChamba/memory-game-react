import { createContext, useContext, useEffect, useReducer } from "react";
import { shuffleArray } from "../utils/helpers";

const GameContext = createContext();
const unshuffledArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

const initState = {
  status: "idle",
  movesCount: 0,
  timer: { intervalRef: null, value: 0 }, // in seconds
  firstCardClicked: false, // timer starts when first card is clicked
  cards: [
    // { value: 1, isFacedUp: false }
  ],
  previousCard: null,
  tempCurrentCard: null, // using when cards not matched and have to show clicked card for a second before facing it down
};

function faceUpACard(cards, index) {
  const updatedCards = cards.map((card, i) =>
    i === index ? { ...card, isFacedUp: true } : card
  );
  return updatedCards;
}

function didGameEnd(cards) {
  const facedDownCards = cards.filter((card) => !card.isFacedUp);
  return facedDownCards.length === 1;
}

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "startGame": {
      // shuffle arr
      const shuffledArr = shuffleArray(unshuffledArr);
      // fill cards with shuffled values
      const shuffledCards = shuffledArr.map((val) => ({
        value: val,
        isFacedUp: false,
      }));
      // reset timer
      clearInterval(state.timer.intervalRef);
      return { ...initState, status: "playing", cards: shuffledCards };
    }
    // Every second
    case "increaseTimer": {
      return {
        ...state,
        timer: { ...state.timer, value: state.timer.value + 1 },
      };
    }
    case "timerStarted": {
      return {
        ...state,
        firstCardClicked: true,
        timer: { ...state.timer, intervalRef: action.payload },
      };
    }
    // Payload is index of the clicked card
    case "cardClicked": {
      const currCard = action.payload;
      // is card  already faced up
      if (state.cards[currCard].isFacedUp) return state;
      // is there a previous card looking for a pair
      // - No
      if (state.previousCard === null) {
        // make this card as previous card and face it up
        const updatedCards = faceUpACard(state.cards, currCard);
        return {
          ...state,
          previousCard: currCard,
          cards: updatedCards,
        };
      } else {
        // - Yes
        // increase move count
        // does the current card matches previous card
        if (
          state.cards[currCard].value === state.cards[state.previousCard].value
        ) {
          // - Yes (game can end)
          // Face up current card
          // Empty previous card
          const updatedCards = faceUpACard(state.cards, currCard);
          // Did the game end (all cards matched, all cards except one has isFacedUp as true)
          if (didGameEnd(state.cards)) {
            // - Yes
            // Stop timer
            clearInterval(state.timer.intervalRef);
            return {
              ...state,
              status: "ended",
              previousCard: null,
              cards: updatedCards,
              movesCount: state.movesCount + 1,
            };
          } else {
            // - No
            return {
              ...state,
              previousCard: null,
              cards: updatedCards,
              movesCount: state.movesCount + 1,
            };
          }
        } else {
          // - No
          // Face up current card (useEffect will react to this and after a second will dispatch 'cardsNotMatched')
          const updatedCards = faceUpACard(state.cards, currCard);
          return {
            ...state,
            status: "cardsDidNotMatch",
            cards: updatedCards,
            movesCount: state.movesCount + 1,
            tempCurrentCard: currCard,
          };
        }
      }
    }
    case "cardsNotMatched": {
      // Face down current and previous cards
      const updatedCards = state.cards.map((card, i) => {
        if (i === state.tempCurrentCard || i === state.previousCard) {
          return { ...card, isFacedUp: false };
        }
        return card;
      });
      return {
        ...state,
        status: "playing",
        cards: updatedCards,
        tempCurrentCard: null,
        previousCard: null,
      };
    }
  }
}
function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(
    function () {
      if (state.status !== "cardsDidNotMatch") return;
      // Leave unmatched cards for a second, then face them down
      setTimeout(function () {
        dispatch({ type: "cardsNotMatched" });
      }, 500);
    },
    [state]
  );

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("accessing context outside the scope");
  return context;
}

export { useGame, GameProvider };
