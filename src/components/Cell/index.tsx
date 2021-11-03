import "./Cell.css";

import { FC } from "react";

interface CellProps {
  flipCellsAround: (coord: [number, number]) => void;
  isLit: boolean;
  coord: [number, number];
}

const Cell: FC<CellProps> = ({ isLit, coord, flipCellsAround }) => {
  const onCellClick = () => {
    flipCellsAround(coord);
  };

  return (
    <td className={`Cell${isLit ? " Cell-lit" : ""}`} onClick={onCellClick} />
  );
};

export default Cell;
