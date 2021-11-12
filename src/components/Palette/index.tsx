import "./Palette.css";

import { FC, useState } from "react";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar from "../Navbar";

interface PaletteProps {
  palette: GeneratedPalette;
}

const Palette: FC<PaletteProps> = ({ palette }) => {
  const [level, setLevel] = useState(500);

  // TODO: add key
  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox background={color.hex} name={color.name} />
  ));

  const onSliderValueChange = (level: number) => setLevel(level);

  return (
    <div className="Palette">
      <Navbar level={level} onSliderValueChange={onSliderValueChange} />
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
