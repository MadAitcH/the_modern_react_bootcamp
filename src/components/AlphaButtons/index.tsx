import "./AlphaButtons.css";

import { FC, MouseEvent } from "react";

interface AlphaButtonsProps {
  guessed: Set<string>;
  handleGuess: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AlphaButtons: FC<AlphaButtonsProps> = ({ handleGuess, guessed }) => {
  return (
    <div className="AlphaButtons">
      {"abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
        <button
          key={ltr}
          value={ltr}
          onClick={handleGuess}
          disabled={guessed.has(ltr)}
        >
          {ltr}
        </button>
      ))}
    </div>
  );
};

export default AlphaButtons;
