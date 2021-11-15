import { FC } from "react";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";

interface PaletteListProps {
  palettes: IPalette[];
}

const PaletteList: FC<PaletteListProps> = ({ palettes }) => {
  return (
    <div className="PaletteList">
      <h1>React Colors</h1>
      {palettes.map(palette => (
        <MiniPalette {...palette} />
      ))}
    </div>
  );
};

export default PaletteList;
