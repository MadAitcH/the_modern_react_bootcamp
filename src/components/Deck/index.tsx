import "./Deck.css";

import { FC, useEffect, useState } from "react";
import Card from "../Card";

async function fetchDeckId(url: string) {
  try {
    const res = await fetch(url);

    const data: {
      success: boolean;
      deck_id: string;
      reamining: number;
    } = await res.json();

    if (!data.success) return null;

    return data;
  } catch {
    return null;
  }
}

async function fetchCard(url: string) {
  try {
    const res = await fetch(url);

    const response: Response = await res.json();

    if (!response.success) return null;

    return response;
  } catch {
    return null;
  }
}

interface ICard {
  code: string;
  image: string;
  value: string;
  suit: string;
}

interface Response {
  success: boolean;
  deck_id: string;
  cards: [
    {
      code: string;
      image: string;
      images: {
        svg: string;
        png: string;
      };
      value: string;
      suit: string;
    }
  ];
  remaining: number;
}

const FETCH_ID_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";

const Deck: FC = () => {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState<ICard[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (deckId) return;

    async function fetchId() {
      let data: {
        deck_id: string;
        reamining: number;
      } | null;

      data = await fetchDeckId(FETCH_ID_URL);

      if (!data) return;

      setDeckId(data.deck_id);
    }

    fetchId();
  }, [deckId]);

  const onDrawClick = async () => {
    if (!deckId) return;

    const res = await fetchCard(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
    );

    if (!res) return;

    const { code, value, suit, image } = res.cards[0];
    setIsDone(res.remaining <= 0);
    setCards([...cards, { code, value, suit, image }]);
  };

  const onRestartClick = async () => {
    let data: {
      deck_id: string;
      reamining: number;
    } | null;

    data = await fetchDeckId(FETCH_ID_URL);
    if (!data) return;

    setIsDone(false);
    setCards([]);
    setDeckId(data.deck_id);

    onDrawClick();
  };

  const cardsEl = cards.map(c => <Card {...c} key={c.code} />);

  return (
    <div className="Deck">
      <h1 className="Deck-title">♦ Card Dealer ♦</h1>
      <h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
      {isDone ? (
        <button className="Deck-btn" onClick={onRestartClick}>
          Restart?
        </button>
      ) : (
        <button className="Deck-btn" onClick={onDrawClick}>
          Get Card!
        </button>
      )}
      <div className="Deck-cardarea">{cardsEl}</div>
    </div>
  );
};

export default Deck;
