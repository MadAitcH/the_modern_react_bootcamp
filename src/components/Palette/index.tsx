import "./Palette.css";

import { FC } from "react";
import { IPalette } from "../../utils/seedColors";
import ColorBox from "../ColorBox";

type PaletteProps = IPalette;

const Palette: FC<PaletteProps> = ({ colors }) => {
  // TODO: add key
  const colorBoxes = colors.map(color => (
    <ColorBox background={color.color} name={color.name} />
  ));

  return (
    <div className="Palette">
      {/* Navbar */}
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
