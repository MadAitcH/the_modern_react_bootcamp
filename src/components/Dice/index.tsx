import "./Dice.css";

import { FC } from "react";
import Die from "../Die";

interface DiceProps {
  dice: number[];
  locked: boolean[];
  rolling: boolean;
  disabled: boolean;
  handleClick: (idx: number) => void;
}

const Dice: FC<DiceProps> = ({
  dice,
  disabled,
  locked,
  rolling,
  handleClick,
}) => {
  return (
    <div className="Dice">
      {dice.map((d, idx) => (
        <Die
          disabled={disabled}
          handleClick={handleClick}
          val={d}
          locked={locked[idx]}
          idx={idx}
          key={idx}
          rolling={rolling && !locked[idx]}
        />
      ))}
    </div>
  );
};

export default Dice;
