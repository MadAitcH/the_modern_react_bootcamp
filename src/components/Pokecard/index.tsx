import "./Pokecard.css";

import { Component } from "react";

export interface IPokecard {
  id: number;
  name: string;
  type: string;
  base_experience: number;
}

class Pokecard extends Component<IPokecard> {
  render() {
    const { id, name, type, base_experience } = this.props;

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
          Exp: <span>{base_experience}</span>
        </p>
      </div>
    );
  }
}

export default Pokecard;
