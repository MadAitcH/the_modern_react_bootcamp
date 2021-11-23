import "rc-slider/assets/index.css";

import { Component } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import Slider from "rc-slider";
import {
  Select,
  MenuItem,
  Snackbar,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import styles from "../../styles/NavbarStyles";
import sizes from "../../styles/sizes";

interface NavbarProps extends WithStyles<typeof styles> {
  level?: number;
  onSliderValueChange?: (level: number) => void;
  onColorFormatChange: (colorFormat: AcceptedFormats) => void;
  showingAllColors?: boolean;
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

  onColorFormatChange(e: SelectChangeEvent<AcceptedFormats>) {
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
    const { level, onSliderValueChange, showingAllColors, classes } =
      this.props;
    const { open, format } = this.state;

    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/"> ReactColorPicker</Link>
        </div>
        {showingAllColors && level && onSliderValueChange && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={onSliderValueChange}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select
            value={format}
            onChange={this.onColorFormatChange}
            sx={{
              fontSize: "1.7rem",
              [sizes.down("lg")]: {
                fontSize: "1.3rem",
              },
              [sizes.down("md")]: {
                fontSize: "0.8rem",
              },
              [sizes.down("xs")]: {
                fontSize: "0.6rem",
              },
            }}
          >
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

export default withStyles(styles)(Navbar);
