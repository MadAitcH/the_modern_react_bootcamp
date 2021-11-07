import "./Die.css";

import { FC } from "react";

interface DieProps {
  locked: boolean;
  idx: number;
  val: number;
  rolling: boolean;
  disabled: boolean;
  handleClick: (idx: number) => void;
}

const faces: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

const Die: FC<DieProps> = ({
  disabled,
  locked,
  idx,
  val,
  rolling,
  handleClick,
}) => {
  const onDieClick = () => {
    handleClick(idx);
  };

  return (
    <i
      onClick={onDieClick}
      data-disabled={disabled}
      className={`Die fas fa-dice-${faces[val]} fa-5x ${
        rolling && "Die-rolling"
      } ${locked && "Die-locked"}`}
    />
  );
};
export default Die;
