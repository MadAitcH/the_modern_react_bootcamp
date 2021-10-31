import "./Pokedex.css";

import Pokecard, { IPokecard } from "../Pokecard";

interface PokedexProps {
  items: IPokecard[];
  totalExp: number;
  isWinner?: boolean;
}

const Pokedex: React.FC<PokedexProps> = ({ isWinner, totalExp, items }) => {
  return (
    <div className="Pokedex">
      <div className="Pokedex__status">
        <h1
          className={
            isWinner ? `Pokedex__status--winner` : `Pokedex__status--loser`
          }
        >
          {isWinner ? "Winning Hand" : "Losing Hand"}
        </h1>
        <h4>
          Total Experience: <span>{totalExp}</span>
        </h4>
      </div>
      <div className="Pokedex__cards">
        {items.map((item) => (
          <Pokecard {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
