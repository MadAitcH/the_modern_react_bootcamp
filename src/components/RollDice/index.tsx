import "./RollDice.css";

import { Component } from "react";
import Die from "../Die";

interface RollDiceState {
  rolling: boolean;
  firstDie: number;
  secondDie: number;
  timer: NodeJS.Timeout | null;
}

class RollDice extends Component<{}, RollDiceState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      rolling: false,
      firstDie: 1,
      secondDie: 1,
      timer: null,
    };

    this.roll = this.roll.bind(this);
  }

  roll() {
    if (this.state.timer) return;

    const timer = setTimeout(() => {
      this.setState({ rolling: false, timer: null });
    }, 700);

    const firstDie = Math.floor(Math.random() * 6) + 1;
    const secondDie = Math.floor(Math.random() * 6) + 1;

    this.setState({
      rolling: true,
      firstDie,
      secondDie,
      timer,
    });
  }

  render() {
    return (
      <div className={`RollDice ${this.state.rolling && "RollDice__active"}`}>
        <div className="RollDice__dice">
          <Die face={this.state.firstDie} />
          <Die face={this.state.secondDie} />
        </div>
        <button
          disabled={this.state.rolling}
          onClick={this.roll}
          className="RollDice__button"
        >
          {this.state.rolling ? "Rolling..." : "Roll Dice!"}
        </button>
      </div>
    );
  }
}

export default RollDice;
