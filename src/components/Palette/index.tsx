import "rc-slider/assets/index.css";
import "./Palette.css";

import { Component } from "react";
import Slider from "rc-slider";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";

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
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.onSliderValueChange}
          />
        </div>
        {/* Navbar */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;
