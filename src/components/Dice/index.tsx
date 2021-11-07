import "./Dice.css";

import { Component } from "react";
import Die from "../Die";

interface DiceProps {
  dice: number[];
  locked: boolean[];
  handleClick: (idx: number) => void;
}

class Dice extends Component<DiceProps> {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((d, idx) => (
          <Die
            handleClick={this.props.handleClick}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
