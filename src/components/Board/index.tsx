import "./Board.css";

import { Component } from "react";
import Cell from "../Cell";
import { hasWonTheGame } from "../../utils";

interface BoardProps {
  /** number of rows of board */
  rowCount: number;
  /** number of cols of board */
  colCount: number;
  /** float, chance any cell is lit at start of game */
  chanceLightStartsOn: number;
}

interface BoardState {
  /** boolean, true when board is all off */
  hasWon: boolean;
  /** array-of-arrays of true/false */
  board: boolean[][];
}

class Board extends Component<BoardProps, BoardState> {
  static defaultProps = {
    rowCount: 5,
    colCount: 5,
    chanceLightStartsOn: 0.4,
  };

  constructor(props: BoardProps) {
    super(props);

    this.state = {
      board: this.createBoard(),
      hasWon: false,
    };

    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
  }

  onResetClick() {
    this.setState({
      board: this.createBoard(),
      hasWon: false,
    });
  }

  /** create a board rowCount high/colCount wide, each cell randomly lit or unlit */
  createBoard() {
    let board: boolean[][] = [];

    const j = this.props.colCount * this.props.rowCount;
    let i = 0;

    while (i < j) {
      let row: boolean[] = [];

      while (row.length < this.props.colCount) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
        i++;
      }

      board.push(row);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround([y, x]: [number, number]) {
    let { colCount, rowCount } = this.props;
    let board = JSON.parse(JSON.stringify(this.state.board));

    function flipCell(y: number, x: number) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < colCount && y >= 0 && y < rowCount) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    const hasWon = hasWonTheGame(board);

    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    return (
      <div>
        {this.state.hasWon ? (
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
                {this.state.board.map((row, y) => {
                  return (
                    <tr key={y}>
                      {row.map((c, x) => (
                        <Cell
                          isLit={c}
                          coord={[y, x]}
                          flipCellsAround={this.flipCellsAround}
                        />
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <button className="Board-reset" onClick={this.onResetClick}>
          Reset
        </button>
      </div>
    );
  }
}

export default Board;
