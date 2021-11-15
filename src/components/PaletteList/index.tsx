import { FC } from "react";
import { Link } from "react-router-dom";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";

interface PaletteListProps {
  palettes: IPalette[];
}

const PaletteList: FC<PaletteListProps> = ({ palettes }) => {
  return (
    <div className="PaletteList">
      <MiniPalette />
      <h1>React Colors</h1>
      {palettes.map(palette => (
        <p key={palette.id}>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}
    </div>
  );
};

export default PaletteList;
