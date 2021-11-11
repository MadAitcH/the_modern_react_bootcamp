import "./ColorBox.css";

import { FC } from "react";

interface ColorBoxProps {
  background: string;
  name: string;
}

const ColorBox: FC<ColorBoxProps> = ({ name, background }) => {
  return (
    <div className="ColorBox" style={{ background }}>
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <button className="copy-button">Copy</button>
      </div>
      <span className="see-more">More</span>
    </div>
  );
};

export default ColorBox;
