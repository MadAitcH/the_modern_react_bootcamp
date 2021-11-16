import { FC } from "react";
import { Redirect } from "react-router-dom";
import { GeneratedPalette } from "../../utils/colorHelpers";
import ColorBox from "../ColorBox";

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

  const shades = gatherShades(palette, colorId);

  const colorBoxes = shades.map(color => (
    <ColorBox key={color.name} name={color.name} background={color.hex} />
  ));

  return (
    <div className="Palette">
      <div>SingleColorPalette</div>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
};

export default SingleColorPalette;
