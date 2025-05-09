import React from "react";

export function Word({
  selectedWord,
  correctLetters,
}: {
  selectedWord: string;
  correctLetters: string[];
}) {
  return (
    <div className="word">
      {selectedWord.split("").map((letter, i) => {
        const isSpace = letter === " ";
        return (
          <span
            className="letter"
            key={i}
            style={{ borderBottom: isSpace ? "none" : undefined }}
          >
            {isSpace
              ? " "
              : correctLetters.includes(letter.toLowerCase())
              ? letter
              : ""}
          </span>
        );
      })}
    </div>
  );
}

export default Word;
