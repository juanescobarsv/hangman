import { Key } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WrongLetters = ({ wrongLetters }: { wrongLetters: any }) => {
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && <p>Wrong letters:</p>}
        {wrongLetters
          .map(
            (
              letter: string | number | null | undefined,
              i: Key | null | undefined
            ) => <span key={i}>{letter}</span>
          )
          .reduce(
            (prev: null, curr: unknown) =>
              prev === null ? [curr] : [prev, ", ", curr],
            null
          )}
      </div>
    </div>
  );
};

export default WrongLetters;
