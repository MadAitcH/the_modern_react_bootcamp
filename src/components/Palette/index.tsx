import "./Palette.css";

import { FC, useState } from "react";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar, { AcceptedFormats } from "../Navbar";
import { Redirect } from "react-router-dom";
import PaletteFooter from "../PaletteFooter";

interface PaletteProps {
  palette: GeneratedPalette | null;
}

const Palette: FC<PaletteProps> = props => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState<AcceptedFormats>("hex");

  // TODO: find a better solution
  if (!props.palette) return <Redirect to="/" />;

  const {
    palette: { colors, paletteName, emoji, id },
  } = props;

  const onColorFormateChange = (colorFormat: AcceptedFormats) => {
    setFormat(colorFormat);
  };

  const onSliderValueChange = (level: number) => setLevel(level);

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      key={color.id}
      background={color[format]}
      name={color.name}
      moreUrl={`/palette/${id}/${color.id}`}
      showLink
    />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        onSliderValueChange={onSliderValueChange}
        onColorFormatChange={onColorFormateChange}
        showingAllColors
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default Palette;
