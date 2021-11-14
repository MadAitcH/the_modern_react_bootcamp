import "./Palette.css";

import { Component } from "react";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar, { AcceptedFormats } from "../Navbar";
import { Redirect } from "react-router-dom";

interface PaletteProps {
  palette: GeneratedPalette | null;
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
    // TODO: find a better solution
    if (!this.props.palette) {
      return <Redirect to="/" />;
    }

    const { level } = this.state;
    const {
      palette: { colors, paletteName, emoji },
    } = this.props;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        background={color[this.state.format]}
        name={color.name}
      />
    ));

    return (
      <div className="Palette">
        <Navbar
          level={level}
          onSliderValueChange={this.onSliderValueChange}
          onColorFormatChange={this.onColorFormatChange}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
