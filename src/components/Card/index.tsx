import "./Card.css";

import { FC, useRef } from "react";

interface CardProps {
  image: string;
  value: string;
  suit: string;
}

const Card: FC<CardProps> = ({ image, value, suit }) => {
  const _transform = useRef(
    `translate(${Math.random() * 40 - 20}px, ${
      Math.random() * 40 - 20
    }px) rotate(${Math.random() * 90 - 45}deg)`
  );

  return (
    <img
      src={image}
      style={{ transform: _transform.current }}
      className="Card"
      alt={`${value} of ${suit}`}
    />
  );
};

export default Card;
