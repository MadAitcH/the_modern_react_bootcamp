import { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { GeneratedPalette } from "../../utils/colorHelpers";
import ColorBox from "../ColorBox";
import Navbar, { AcceptedFormats } from "../Navbar";
import PaletteFooter from "../PaletteFooter";

interface IColor {
  name: string;
  id: string;
  hex: string;
  rgb: string;
  rgba: string;
}

interface SingleColorPaletteProps {
  colorId: string;
  palette: GeneratedPalette | null;
}

const SingleColorPalette: FC<SingleColorPaletteProps> = ({
  colorId,
  palette,
}) => {
  const [format, setFormat] = useState<AcceptedFormats>("hex");

  const gatherShades = (palette: GeneratedPalette, colorToFilterBy: string) => {
    const shades: IColor[] = [];
    const allColors = palette.colors;

    for (let key in allColors) {
      shades.push(
        ...allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  };

  // TODO: find a better solution
  if (!palette) {
    return <Redirect to="/" />;
  }

  const onColorFormatChange = (format: AcceptedFormats) => {
    setFormat(format);
  };

  const { paletteName, emoji } = palette;
  const shades = gatherShades(palette, colorId);

  const colorBoxes = shades.map(color => (
    <ColorBox key={color.name} name={color.name} background={color[format]} />
  ));

  return (
    <div className="Palette">
      <Navbar onColorFormatChange={onColorFormatChange} />
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default SingleColorPalette;
