import "./Palette.css";

import { Component } from "react";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar, { AcceptedFormats } from "../Navbar";

interface PaletteProps {
  palette: GeneratedPalette;
}

interface PaletteState {
  level: number;
  format: AcceptedFormats;
}

class Palette extends Component<PaletteProps, PaletteState> {
  constructor(props: PaletteProps) {
    super(props);

    this.state = {
      level: 500,
      format: "hex",
    };

    this.onSliderValueChange = this.onSliderValueChange.bind(this);
    this.onColorFormatChange = this.onColorFormatChange.bind(this);
  }

  onSliderValueChange(level: number) {
    this.setState({
      level,
    });
  }

  onColorFormatChange(format: AcceptedFormats) {
    this.setState({ format });
  }

  render() {
    const { level } = this.state;
    const { palette } = this.props;

    // TODO: add key
    const colorBoxes = palette.colors[level].map(color => (
      <ColorBox background={color[this.state.format]} name={color.name} />
    ));

    return (
      <div className="Palette">
        <Navbar
          level={level}
          onSliderValueChange={this.onSliderValueChange}
          onColorFormatChange={this.onColorFormatChange}
        />
        {/* Navbar */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;
