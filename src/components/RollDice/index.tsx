import "./RollDice.css";

import { useState } from "react";
import Die from "../Die";

const RollDice: React.FC = () => {
  const [rolling, setRolling] = useState(false);
  const [firstDie, setFirstDie] = useState(1);
  const [secondDie, setSecondDie] = useState(1);

  const roll = () => {
    if (rolling) return;

    setTimeout(() => {
      setRolling(false);
    }, 700);

    const firstDie = Math.floor(Math.random() * 6) + 1;
    const secondDie = Math.floor(Math.random() * 6) + 1;

    setRolling(true);
    setFirstDie(firstDie);
    setSecondDie(secondDie);
  };

  return (
    <div className={`RollDice ${rolling && "RollDice__active"}`}>
      <div className="RollDice__dice">
        <Die face={firstDie} />
        <Die face={secondDie} />
      </div>
      <button disabled={rolling} onClick={roll} className="RollDice__button">
        {rolling ? "Rolling..." : "Roll Dice!"}
      </button>
    </div>
  );
};

export default RollDice;
