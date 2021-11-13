import "./Palette.css";

import { FC, useState } from "react";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar, { AcceptedFormats } from "../Navbar";

interface PaletteProps {
  palette: GeneratedPalette;
}

const Palette: FC<PaletteProps> = ({ palette }) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState<AcceptedFormats>("hex");

  const onColorFormateChange = (colorFormat: AcceptedFormats) => {
    setFormat(colorFormat);
  };

  const onSliderValueChange = (level: number) => setLevel(level);

  // TODO: add key
  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox background={color[format]} name={color.name} />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        onSliderValueChange={onSliderValueChange}
        onColorFormateChange={onColorFormateChange}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
