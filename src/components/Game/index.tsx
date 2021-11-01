import "./Game.css";

import { Component } from "react";
import Coin from "../Coin";

interface GameState {
  face: "heads" | "tails" | "";
  flips: number;
  heads: number;
  tails: number;
}

class Game extends Component<any, GameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      face: "",
      heads: 0,
      tails: 0,
      flips: 0,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    const face = Math.random() <= 0.5 ? "heads" : "tails";

    this.setState((curState) => {
      return {
        face,
        flips: curState.flips + 1,
        heads: face === "heads" ? curState.heads + 1 : curState.heads,
        tails: face === "tails" ? curState.tails + 1 : curState.tails,
      };
    });
  }

  render() {
    return (
      <div className="Game">
        <h1 className="Game__title">Let's Flip a Coin!</h1>
        <div className="Game__coin">
          {this.state.face && <Coin face={this.state.face} />}
        </div>
        <button className="Game__button" onClick={this.onButtonClick}>
          Click to Flip!
        </button>
        <p className="Game__status">
          Out of <span>{this.state.flips}</span> flips, there have been{" "}
          <span>{this.state.heads}</span> heads and{" "}
          <span>{this.state.tails}</span> tails.
        </p>
      </div>
    );
  }
}

export default Game;
