import "./Palette.css";
import "rc-slider/assets/index.css";

import { FC, useState } from "react";
import Slider from "rc-slider";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";

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
      <Slider
        defaultValue={level}
        min={100}
        max={900}
        step={100}
        onAfterChange={onSliderValueChange}
      />
      {/* Navbar */}
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
