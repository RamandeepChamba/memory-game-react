import { useGame } from "../contexts/GameContext";
import { formatTime } from "../utils/helpers";

function Timer() {
  const { state } = useGame();
  const { value: time } = state.timer;
  const { hr, min, sec } = formatTime(time);

  return (
    <div>
      <strong>Time: </strong>
      <span>{hr}:</span>
      <span>{min}:</span>
      <span>{sec}</span>
    </div>
  );
}

export default Timer;
