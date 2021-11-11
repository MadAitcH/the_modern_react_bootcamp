import "./ColorBox.css";

import { FC } from "react";

interface ColorBoxProps {
  background: string;
  name: string;
}

const ColorBox: FC<ColorBoxProps> = ({ name, background }) => {
  return (
    <div className="ColorBox" style={{ background: background }}>
      <span>{name}</span>
      <span>MORE</span>
    </div>
  );
};

export default ColorBox;
