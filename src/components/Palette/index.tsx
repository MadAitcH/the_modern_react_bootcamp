import "./Palette.css";

import { Component } from "react";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar from "../Navbar";

interface PaletteProps {
  palette: GeneratedPalette;
}

interface PaletteState {
  level: number;
}

class Palette extends Component<PaletteProps, PaletteState> {
  constructor(props: PaletteProps) {
    super(props);

    this.state = {
      level: 500,
    };

    this.onSliderValueChange = this.onSliderValueChange.bind(this);
  }

  onSliderValueChange(level: number) {
    this.setState({
      level,
    });
  }

  render() {
    const { level } = this.state;
    const { palette } = this.props;

    // TODO: add key
    const colorBoxes = palette.colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));

    return (
      <div className="Palette">
        <Navbar level={level} onSliderValueChange={this.onSliderValueChange} />
        {/* Navbar */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;
