import "./Deck.css";

import { Component } from "react";
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

interface DeckState {
  remaining: number;
  deckId: string;
  cards: ICard[];
  isDone: boolean;
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

class Deck extends Component<any, DeckState> {
  constructor(props: any) {
    super(props);

    this.state = {
      remaining: 0,
      deckId: "",
      cards: [],
      isDone: false,
    };

    this.onDrawClick = this.onDrawClick.bind(this);
    this.onRestartClick = this.onRestartClick.bind(this);
  }

  async componentDidMount() {
    let data: {
      deck_id: string;
      reamining: number;
    } | null;

    // this is not cool.
    do {
      data = await fetchDeckId(FETCH_ID_URL);
    } while (!data);

    this.setState({
      deckId: data.deck_id,
      remaining: data.reamining,
    });
  }

  async onDrawClick() {
    if (!this.state.deckId) return;

    const res = await fetchCard(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
    );

    if (!res) return;

    this.setState(st => {
      const { code, value, suit, image } = res.cards[0];
      return {
        remaining: res.remaining,
        cards: [...st.cards, { code, value, suit, image }],
        isDone: res.remaining <= 0,
      };
    });
  }

  async onRestartClick() {
    let data: {
      deck_id: string;
      reamining: number;
    } | null;

    data = await fetchDeckId(FETCH_ID_URL);

    if (!data) return;

    this.setState({
      isDone: false,
      cards: [],
      deckId: data.deck_id,
      remaining: data.reamining,
    });

    this.onDrawClick();
  }

  render() {
    const cards = this.state.cards.map(c => <Card {...c} key={c.code} />);
    return (
      <div className="Deck">
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">
          ♦ A little demo made with React ♦
        </h2>
        {this.state.isDone ? (
          <button className="Deck-btn" onClick={this.onRestartClick}>
            Restart?
          </button>
        ) : (
          <button className="Deck-btn" onClick={this.onDrawClick}>
            Get Card!
          </button>
        )}
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
