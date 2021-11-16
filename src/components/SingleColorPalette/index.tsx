import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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
  palette: GeneratedPalette | null;
  colorId: string;
}

interface SingleColorPaletteState {
  format: AcceptedFormats;
}

class SingleColorPalette extends Component<
  SingleColorPaletteProps,
  SingleColorPaletteState
> {
  private shades: IColor[];

  constructor(props: SingleColorPaletteProps) {
    super(props);

    this.shades = [];

    this.state = {
      format: "hex",
    };

    this.gatherShades = this.gatherShades.bind(this);
    this.onColorFormatChange = this.onColorFormatChange.bind(this);
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

  onColorFormatChange(format: AcceptedFormats) {
    this.setState({ format });
  }

  render() {
    // TODO: find a better solution
    if (!this.props.palette) {
      return <Redirect to="/" />;
    }

    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    this.shades = this.gatherShades(this.props.palette, this.props.colorId);

    const colorBoxes = this.shades.map(color => (
      <ColorBox key={color.name} name={color.name} background={color[format]} />
    ));

    return (
      <div className="SingleColorPalette Palette">
        <Navbar onColorFormatChange={this.onColorFormatChange} />
        <div className="Palette-colors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${id}`} className="back-button">
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
