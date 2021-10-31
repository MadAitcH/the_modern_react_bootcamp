import "./Pokecard.css";

import { Component } from "react";

interface PokecardProps {
  name: string;
  image: string;
  type: string;
  exp: number;
  id: number;
}

class Pokecard extends Component<PokecardProps> {
  render() {
    const { id, name, image, type, exp } = this.props;

    return (
      <div className="Pokecard">
        <div className="Pokecard__image_container">
          <img
            className="Pokecard__image"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id
              .toString()
              .padStart(3, "0")}.png`}
            alt={name}
          />
        </div>
        <h2 className="Pokecard__name">{name}</h2>
        <p className="Pokecard__type">
          Type: <span>{type}</span>
          <br />
          Exp: <span>{exp}</span>
        </p>
      </div>
    );
  }
}

export default Pokecard;
