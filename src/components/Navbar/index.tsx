import "rc-slider/assets/index.css";
import "./Navbar.css";

import { FC, useState } from "react";
import Slider from "rc-slider";
import {
  Select,
  MenuItem,
  Snackbar,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import CloseButton from "@mui/icons-material/Close";

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
  const [open, setOpen] = useState(false);

  const handleFormatChange = (e: SelectChangeEvent<AcceptedFormats>) => {
    switch (e.target.value) {
      case "hex":
      case "rgb":
      case "rgba":
        setFormat(e.target.value);
        setOpen(true);
        onColorFormateChange(e.target.value);
        break;
      default:
        return;
    }
  };

  const closeSnackbar = () => {
    setOpen(false);
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format changed to {format.toUpperCase()}!</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={closeSnackbar}
        action={[
          <IconButton
            color="inherit"
            onClick={closeSnackbar}
            key="close"
            aria-label="close"
          >
            <CloseButton />
          </IconButton>,
        ]}
      ></Snackbar>
    </header>
  );
};

export default Navbar;
