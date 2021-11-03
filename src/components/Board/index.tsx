import "./Board.css";

import { FC, useState } from "react";
import Cell from "../Cell";
import { createBoard, flipCell, hasWonTheGame } from "../../utils";

interface BoardProps {
  /** number of rows of board */
  rowCount: number;
  /** number of cols of board */
  colCount: number;
  /** float, chance any cell is lit at start of game */
  chanceLightStartsOn: number;
}

const defaultProps: BoardProps = {
  rowCount: 5,
  colCount: 5,
  chanceLightStartsOn: 0.2,
};

const Board: FC<BoardProps> = ({
  rowCount = defaultProps.rowCount,
  colCount = defaultProps.colCount,
  chanceLightStartsOn = defaultProps.chanceLightStartsOn,
}) => {
  const [hasWon, setHasWon] = useState(false);
  const [board, setBoard] = useState<boolean[][]>(
    createBoard(colCount, rowCount, chanceLightStartsOn)
  );

  const onResetClick = () => {
    setBoard(createBoard(colCount, rowCount, chanceLightStartsOn));
    setHasWon(false);
  };

  const flipCellsAround = ([y, x]: [number, number]) => {
    let boardCopy = JSON.parse(JSON.stringify(board));

    flipCell([y, x], colCount, rowCount, boardCopy);
    flipCell([y - 1, x], colCount, rowCount, boardCopy);
    flipCell([y + 1, x], colCount, rowCount, boardCopy);
    flipCell([y, x + 1], colCount, rowCount, boardCopy);
    flipCell([y, x - 1], colCount, rowCount, boardCopy);

    const hasWon = hasWonTheGame(boardCopy);
    setBoard(boardCopy);
    setHasWon(hasWon);
  };

  return (
    <div>
      {hasWon ? (
        <div className="winner">
          <span className="neon-orange">You</span>
          <span className="neon-blue">Win!</span>
        </div>
      ) : (
        <div>
          <div className="Board-title">
            <div className="neon-orange">Lights</div>
            <div className="neon-blue">Out</div>
          </div>
          <table className="Board">
            <tbody>
              {board.map((row, y) => {
                return (
                  <tr key={y}>
                    {row.map((c, x) => (
                      <Cell
                        isLit={c}
                        coord={[y, x]}
                        flipCellsAround={flipCellsAround}
                      />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <button className="Board-reset" onClick={onResetClick}>
        Reset
      </button>
    </div>
  );
};

Board.defaultProps = defaultProps;

export default Board;
