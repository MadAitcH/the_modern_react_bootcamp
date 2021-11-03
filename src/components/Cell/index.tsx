import "./Cell.css";

import { Component } from "react";

interface CellProps {
  flipCellsAround: (coord: [number, number]) => void;
  isLit: boolean;
  coord: [number, number];
}

class Cell extends Component<CellProps> {
  constructor(props: CellProps) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick() {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAround(this.props.coord);
  }

  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    return <td className={classes} onClick={this.onCellClick} />;
  }
}

export default Cell;
