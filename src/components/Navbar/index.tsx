import "rc-slider/assets/index.css";
import "./Navbar.css";

import { Component } from "react";
import Slider from "rc-slider";

interface NavbarProps {
  level: number;
  onSliderValueChange: (level: number) => void;
}

class Navbar extends Component<NavbarProps> {
  render() {
    const { level, onSliderValueChange } = this.props;

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
      </header>
    );
  }
}

export default Navbar;
