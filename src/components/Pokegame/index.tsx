import "./Pokegame.css";

import { IPokecard } from "../Pokecard";
import Pokedex from "../Pokedex";

interface PokegameProps {
  items: IPokecard[];
}

const Pokegame: React.FC<PokegameProps> = ({ items: propsItmes }) => {
  const items = propsItmes.slice(0, 8);
  const [firstDeck, secondDeck] = chooseRandomPokeCard(items, 4);
  const firstDeckExp = firstDeck.reduce((a, v) => a + v.base_experience, 0);
  const secondDeckExp = secondDeck.reduce((a, v) => a + v.base_experience, 0);

  return (
    <div className="Pokegame">
      <Pokedex
        items={firstDeck}
        totalExp={firstDeckExp}
        isWinner={secondDeckExp < firstDeckExp}
      />
      <hr />
      <Pokedex
        items={secondDeck}
        totalExp={secondDeckExp}
        isWinner={secondDeckExp > firstDeckExp}
      />
    </div>
  );
};

function chooseRandomPokeCard(arr: IPokecard[], count: number): IPokecard[][] {
  if (arr.length === count || arr.length < count) {
    return [arr, [] as IPokecard[]];
  }

  const firstIndices: number[] = [];

  while (firstIndices.length < count) {
    const index = Math.floor(Math.random() * arr.length);

    if (!firstIndices.includes(index)) {
      firstIndices.push(index);
    }
  }

  const firstDeck = firstIndices.map((idx) => arr[idx]);
  const secondDeck = arr.filter((_, i) => !firstIndices.includes(i));

  return [firstDeck, secondDeck];
}

export default Pokegame;
