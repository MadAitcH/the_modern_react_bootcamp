import "./Palette.css";

import { FC, useState } from "react";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar, { AcceptedFormats } from "../Navbar";

interface PaletteProps {
  palette: GeneratedPalette;
}

const Palette: FC<PaletteProps> = ({
  palette: { colors, paletteName, emoji },
}) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState<AcceptedFormats>("hex");

  const onColorFormateChange = (colorFormat: AcceptedFormats) => {
    setFormat(colorFormat);
  };

  const onSliderValueChange = (level: number) => setLevel(level);

  const colorBoxes = colors[level].map(color => (
    <ColorBox key={color.id} background={color[format]} name={color.name} />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        onSliderValueChange={onSliderValueChange}
        onColorFormateChange={onColorFormateChange}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <footer className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </footer>
    </div>
  );
};

export default Palette;
