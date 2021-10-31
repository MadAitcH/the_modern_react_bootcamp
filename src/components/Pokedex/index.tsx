import "./Pokedex.css";

import { Component } from "react";
import Pokecard, { IPokecard } from "../Pokecard";

interface PokedexProps {
  items: IPokecard[];
  totalExp: number;
  isWinner?: boolean;
}

class Pokedex extends Component<PokedexProps> {
  render() {
    return (
      <div className="Pokedex">
        <div className="Pokedex__status">
          <h1
            className={
              this.props.isWinner
                ? `Pokedex__status--winner`
                : `Pokedex__status--loser`
            }
          >
            {this.props.isWinner ? "Winning Hand" : "Losing Hand"}
          </h1>
          <h4>
            Total Experience: <span>{this.props.totalExp}</span>
          </h4>
        </div>
        <div className="Pokedex__cards">
          {this.props.items.map((item) => (
            <Pokecard {...item} key={item.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
