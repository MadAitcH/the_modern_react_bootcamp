import "rc-slider/assets/index.css";
import "./Navbar.css";

import { Component } from "react";
import Slider from "rc-slider";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface NavbarProps {
  level: number;
  onSliderValueChange: (level: number) => void;
  onColorFormatChange: (colorFormat: AcceptedFormats) => void;
}

interface NavbarState {
  format: AcceptedFormats;
}

export type AcceptedFormats = "hex" | "rgb" | "rgba";

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);

    this.state = {
      format: "hex",
    };

    this.onColorFormatChange = this.onColorFormatChange.bind(this);
  }

  onColorFormatChange(e: SelectChangeEvent<"hex" | "rgb" | "rgba">) {
    switch (e.target.value) {
      case "hex":
      case "rgb":
      case "rgba":
        this.setState({ format: e.target.value }, () => {
          this.props.onColorFormatChange(this.state.format);
        });
        break;
      default:
        return;
    }
  }

  render() {
    const { level, onSliderValueChange } = this.props;
    const { format } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          {/* TODO: Change this to a Link */}
          <a href="/">ReactColorPicker</a>
        </div>
        <div className="silder-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={onSliderValueChange}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.onColorFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

export default Navbar;
