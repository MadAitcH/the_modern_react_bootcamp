import "./ColorBox.css";

import { FC, useState } from "react";

interface ColorBoxProps {
  /** Array of colors for background of ColorBox */
  palette: string[];
}

const ColorBox: FC<ColorBoxProps> = ({ palette }) => {
  const randomPick = (arr: string[]): string => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const onBoxClick = () => {
    let newBg;
    do {
      newBg = randomPick(palette);
    } while (newBg === bg);

    setBg(newBg);
  };

  const [bg, setBg] = useState(randomPick(palette));

  return (
    <div
      className="ColorBox"
      onClick={onBoxClick}
      style={{ backgroundColor: bg }}
    />
  );
};

export default ColorBox;
