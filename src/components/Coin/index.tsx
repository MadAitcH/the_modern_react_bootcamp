import "./Coin.css";

import { FC } from "react";
import heads from "./heads.jpg";
import tails from "./tails.jpg";

interface CoinProps {
  face: "tails" | "heads";
}

const Coin: FC<CoinProps> = ({ face }) => {
  return (
    <div className="Coin">
      <img
        className="Coin__image"
        src={face === "heads" ? heads : tails}
        alt={face}
      />
    </div>
  );
};

export default Coin;
