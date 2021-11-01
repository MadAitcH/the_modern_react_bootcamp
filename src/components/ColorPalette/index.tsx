import "./ColroPalette.css";

import { Component } from "react";
import ColorBox from "../ColorBox";

interface ColorPaletteProps {
  palette: string[];
  boxCount: number;
}

class ColorPalette extends Component<ColorPaletteProps> {
  static defaultProps = {
    palette: [
      "pink",
      "yellow",
      "#137174",
      "rgb(99,199,29)",
      "rgba(255, 93, 38, 200)",
      "gold",
      "whitesmoke",
      "orange",
      "bisque",
      "brown",
      "burlywood",
      "cornflowerblue",
      "crimson",
      "darkorange",
      "darkseagreen",
      "tomato",
    ],
    boxCount: 18,
  };

  render() {
    return (
      <div className="ColorPalette">
        {Array.from({ length: this.props.boxCount }).map(() => (
          <ColorBox palette={this.props.palette} />
        ))}
      </div>
    );
  }
}

export default ColorPalette;
