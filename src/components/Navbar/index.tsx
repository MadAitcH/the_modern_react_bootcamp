import "rc-slider/assets/index.css";
import "./Navbar.css";

import { Component } from "react";
import Slider from "rc-slider";
import {
  Select,
  MenuItem,
  Snackbar,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface NavbarProps {
  level: number;
  onSliderValueChange: (level: number) => void;
  onColorFormatChange: (colorFormat: AcceptedFormats) => void;
}

interface NavbarState {
  format: AcceptedFormats;
  open: boolean;
}

export type AcceptedFormats = "hex" | "rgb" | "rgba";

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);

    this.state = {
      format: "hex",
      open: false,
    };

    this.onColorFormatChange = this.onColorFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  onColorFormatChange(e: SelectChangeEvent<"hex" | "rgb" | "rgba">) {
    switch (e.target.value) {
      case "hex":
      case "rgb":
      case "rgba":
        this.setState({ format: e.target.value, open: true }, () => {
          this.props.onColorFormatChange(this.state.format);
        });
        break;
      default:
        return;
    }
  }

  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { level, onSliderValueChange } = this.props;
    const { open, format } = this.state;

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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format changed to {format.toUpperCase()}!
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              color="inherit"
              onClick={this.closeSnackbar}
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        ></Snackbar>
      </header>
    );
  }
}

export default Navbar;
