import "rc-slider/assets/index.css";
import "./Navbar.css";

import { FC, useState } from "react";
import Slider from "rc-slider";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface NavbarProps {
  level: number;
  onSliderValueChange: (level: number) => void;
  onColorFormateChange: (colorFormat: AcceptedFormats) => void;
}

export type AcceptedFormats = "hex" | "rgb" | "rgba";

const Navbar: FC<NavbarProps> = ({
  level,
  onSliderValueChange,
  onColorFormateChange,
}) => {
  const [format, setFormat] = useState<AcceptedFormats>("hex");

  const handleFormatChange = (e: SelectChangeEvent<AcceptedFormats>) => {
    switch (e.target.value) {
      case "hex":
      case "rgb":
      case "rgba":
        setFormat(e.target.value);
        onColorFormateChange(e.target.value);
        break;
      default:
        return;
    }
  };

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
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
};

export default Navbar;
