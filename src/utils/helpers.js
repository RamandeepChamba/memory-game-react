// Shuffle Array

export function shuffleArray(arr) {
  const arrCpy = [...arr];
  const shuffledArray = [];
  while (arrCpy.length > 0) {
    const randomIndex = Math.floor(Math.random() * arrCpy.length);
    const [selectedValue] = arrCpy.splice(randomIndex, 1);
    shuffledArray.push(selectedValue);
  }
  return shuffledArray;
}

export function formatTime(timeInSeconds) {
  const hr = (Math.trunc(Math.trunc(timeInSeconds / 60) / 60) + "").padStart(
    2,
    "0"
  );
  const min = ((Math.trunc(timeInSeconds / 60) % 60) + "").padStart(2, "0");
  const sec = ((timeInSeconds % 60) + "").padStart(2, "0");
  return { hr, min, sec };
}
