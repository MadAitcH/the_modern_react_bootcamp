import "./Game.css";

import { FC, useState } from "react";
import Coin from "../Coin";

const Game: FC = () => {
  const [face, setFace] = useState<"heads" | "tails" | "">("");
  const [flips, setFlips] = useState(0);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);

  const onButtonClick = () => {
    const face = Math.random() <= 0.5 ? "heads" : "tails";

    setFace(face);
    setFlips(flips + 1);

    if (face === "heads") {
      setHeads(heads + 1);
    } else {
      setTails(tails + 1);
    }
  };

  return (
    <div className="Game">
      <h1 className="Game__title">Let's Flip a Coin!</h1>
      <div className="Game__coin">{face && <Coin face={face} />}</div>
      <button className="Game__button" onClick={onButtonClick}>
        Click to Flip!
      </button>
      <p className="Game__status">
        Out of <span>{flips}</span> flips, there have been <span>{heads}</span>{" "}
        heads and <span>{tails}</span> tails.
      </p>
    </div>
  );
};

export default Game;
