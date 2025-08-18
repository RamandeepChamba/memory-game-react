import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useGame } from "../contexts/GameContext";
import { formatTime } from "../utils/helpers";

function GameEndScreen() {
  const { state } = useGame();
  const [isVisible, setIsVisible] = useState(false);
  const { hr, min, sec } = formatTime(state.timer.value);

  useEffect(
    function () {
      if (state.status !== "ended") return;
      setIsVisible(true);
    },
    [state]
  );

  return isVisible ? (
    <Modal onClose={() => setIsVisible(false)}>
      <p>
        🎉 🎉 Congratulations! 🎉 🎉
        <br /> You finished the game in <strong>{state.movesCount}</strong>{" "}
        moves <br />
        It took you{" "}
        <strong>
          {hr}hr {min}min and {sec}sec
        </strong>
      </p>
    </Modal>
  ) : null;
}

export default GameEndScreen;
