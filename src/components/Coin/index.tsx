import "./Coin.css";

import { Component } from "react";
import heads from "./heads.jpg";
import tails from "./tails.jpg";

interface CoinProps {
  face: "tails" | "heads";
}

class Coin extends Component<CoinProps> {
  render() {
    return (
      <div className="Coin">
        <img
          className="Coin__image"
          src={this.props.face === "heads" ? heads : tails}
          alt={this.props.face}
        />
      </div>
    );
  }
}

export default Coin;
