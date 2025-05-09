import React, { useEffect } from "react";
import { checkWin } from "../helpers/helpers";

export function capitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
}) => {
  let finalMessage = "";
  let finalMessageRevealWorld = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Congratulations! You won 😮";
    finalMessageRevealWorld = `The correct word was: ${capitalize(
      selectedWord
    )}`;
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Unfortunately you lost 🙂‍↔️";
    finalMessageRevealWorld = `The correct word was: ${capitalize(
      selectedWord
    )}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWorld}</h3>
        <button onClick={playAgain}>Play Again!</button>
      </div>
    </div>
  );
};

export default Popup;
