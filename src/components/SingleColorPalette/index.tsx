import { Component } from "react";
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
  palette: GeneratedPalette | null;
  colorId: string;
}

class SingleColorPalette extends Component<SingleColorPaletteProps> {
  private shades: IColor[];

  constructor(props: SingleColorPaletteProps) {
    super(props);

    this.shades = [];

    this.gatherShades = this.gatherShades.bind(this);
  }

  gatherShades(palette: GeneratedPalette, colorToFilterBy: string) {
    const shades: IColor[] = [];
    const allColors = palette.colors;

    for (let key in allColors) {
      shades.push(
        ...allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  }

  render() {
    // TODO: find a better solution
    if (!this.props.palette) {
      return <Redirect to="/" />;
    }

    this.shades = this.gatherShades(this.props.palette, this.props.colorId);

    const colorBoxes = this.shades.map(color => (
      <ColorBox key={color.name} name={color.name} background={color.hex} />
    ));

    return (
      <div className="Palette">
        <div>SingleColorPalette</div>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
