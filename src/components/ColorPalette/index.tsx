import "./ColroPalette.css";

import { FC } from "react";
import ColorBox from "../ColorBox";

interface ColorPaletteProps {
  palette: string[];
  boxCount: number;
}

const ColorPalette: FC<ColorPaletteProps> = ({ boxCount, palette }) => {
  return (
    <div className="ColorPalette">
      {Array.from({ length: boxCount }).map(() => (
        <ColorBox palette={palette} />
      ))}
    </div>
  );
};

export default ColorPalette;
