import "./Dice.css";

import { Component } from "react";
import Die from "../Die";

interface DiceProps {
  dice: number[];
  locked: boolean[];
  disabled: boolean;
  rolling: boolean;
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
            disabled={this.props.disabled}
            rolling={this.props.rolling && !this.props.locked[idx]}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
