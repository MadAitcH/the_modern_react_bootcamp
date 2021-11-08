import "./Card.css";

import { Component } from "react";

interface CardProps {
  image: string;
  value: string;
  suit: string;
}

class Card extends Component<CardProps> {
  _transform: string;

  constructor(props: CardProps) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }

  render() {
    return (
      <img
        src={this.props.image}
        style={{ transform: this._transform }}
        className="Card"
        alt={`${this.props.value} of ${this.props.suit}`}
      />
    );
  }
}

export default Card;
