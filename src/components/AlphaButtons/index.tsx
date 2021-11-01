import "./AlphaButtons.css";

import { Component, MouseEvent } from "react";

interface AlphaButtonsProps {
  guessed: Set<string>;
  handleGuess: (e: MouseEvent<HTMLButtonElement>) => void;
}

class AlphaButtons extends Component<AlphaButtonsProps> {
  render() {
    return (
      <div className="AlphaButtons">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
          <button
            key={ltr}
            value={ltr}
            onClick={this.props.handleGuess}
            disabled={this.props.guessed.has(ltr)}
          >
            {ltr}
          </button>
        ))}
      </div>
    );
  }
}

export default AlphaButtons;
