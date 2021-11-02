import "./Hangman.css";

import { FC, MouseEvent, useState } from "react";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";
import { checkGuess } from "../../utils";
import AlphaButtons from "../AlphaButtons";

interface HangmanProps {
  maxWrong?: number;
  images?: string[];
}

const defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6],
};

const Hangman: FC<HangmanProps> = ({
  maxWrong = defaultProps.maxWrong,
  images = defaultProps.images,
}) => {
  const [nWrong, setNWrong] = useState(0);
  const [answer, setAnswer] = useState(randomWord());
  const [guessed, setGuessed] = useState<Set<string>>(new Set());

  const handleGuess = (e: MouseEvent<HTMLButtonElement>) => {
    let ltr = (e.target as HTMLButtonElement).value;

    setGuessed(new Set(guessed.add(ltr)));
    setNWrong(nWrong + (answer.includes(ltr) ? 0 : 1));
  };

  const onRestartClick = () => {
    setAnswer(randomWord());
    setNWrong(0);
    setGuessed(new Set());
  };

  const guessedWord = () => {
    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  };

  return (
    <div className="Hangman">
      <h1>Hangman</h1>
      <img src={images[nWrong]} alt={`${nWrong}/${maxWrong} wrong guesses`} />
      <p className="Hangman-wrong">Wrong Guesses: {nWrong}</p>
      <p className="Hangman-word">
        {nWrong < maxWrong ? guessedWord() : answer}
      </p>

      {checkGuess(guessed, answer) ? (
        <div>
          <h2>You Won!</h2>
          <button onClick={onRestartClick} className="Hangman-restart">
            Restart!
          </button>
        </div>
      ) : nWrong < maxWrong ? (
        <AlphaButtons guessed={guessed} handleGuess={handleGuess} />
      ) : (
        <div>
          <h2>Game Over</h2>
          <button onClick={onRestartClick} className="Hangman-restart">
            Restart!
          </button>
        </div>
      )}
    </div>
  );
};

export default Hangman;
