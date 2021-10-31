import "./Pokedex.css";

import { Component } from "react";
import Pokecard, { IPokecard } from "../Pokecard";

interface PokedexProps {
  items: IPokecard[];
}

class Pokedex extends Component<PokedexProps> {
  render() {
    return (
      <div className="Pokedex">
        {this.props.items.map((item) => (
          <Pokecard {...item} key={item.id} />
        ))}
      </div>
    );
  }
}

export default Pokedex;
